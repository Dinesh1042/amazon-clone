import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from '@firebase/util';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'shared/models/category';
import { Product } from 'shared/models/product';
import { CategoryService } from 'shared/services/category.service';

import { AdminProductService } from '../../../services/product/admin-product.service';
import { AdminProductCardComponent } from '../admin-product-card/admin-product-card.component';

@Component({
  selector: 'admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss'],
})
export class AdminProductFormComponent implements OnInit, OnDestroy {
  @Input('cardComponent') cardComponent!: AdminProductCardComponent;
  @Input('isEditProduct') isEditProduct = false;
  @Input('editProduct') editProductValue?: Product;

  @Output('productFormEvent') productFormEvent = new EventEmitter<Product>();
  @Output('changesSavedEvent') changesSavedEvent = new EventEmitter<boolean>();

  productForm: FormGroup;
  loading = false;
  categoryList!: Observable<Category[]>;

  private deleteImages: string[] = [];
  private isChangesOccurred = false;
  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private adminProductService: AdminProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      category: [null, [Validators.required]],
      originalPrice: [null, [Validators.required, Validators.min(0)]],
      offerPrice: [null, [Validators.required, Validators.min(0)]],
      rating: [
        null,
        [Validators.required, Validators.min(0), Validators.max(5)],
      ],
      images: this.fb.array([], Validators.required),
      description: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.categoryList = this.categoryService.getCategories();

    this.productFormEvent.emit(this.productForm.value);

    this.subscriptions.add(
      this.productForm.valueChanges.subscribe((form) => {
        this.productFormEvent.emit(form);
        !this.isChangesOccurred &&
          this.productForm.dirty &&
          this.changesSavedEvent.emit(false);
        this.isChangesOccurred = this.productForm.dirty;
      })
    );

    this.subscriptions.add(
      this.cardComponent.addImageEvent$.subscribe((file) =>
        this.addImages(file)
      )
    );

    this.subscriptions.add(
      this.cardComponent.removeImageEvent$.subscribe((index) =>
        this.removeImage(index)
      )
    );

    if (this.isEditProduct && this.editProductValue) {
      this.productForm.patchValue(this.editProductValue);
      this.editProductValue.images.forEach((image) =>
        this.images.push(this.fb.control(image))
      );
    }
  }

  onSubmit() {
    if (this.productForm.invalid || this.loading || this.images.length < 4)
      return;
    if (!this.isChangesOccurred) {
      this.router.navigate(['/admin/products']);
      return;
    }

    const productFormValue: Product = this.productForm.value;

    this.loading = true;
    this.productForm.disable();

    const submitProduct =
      this.editProductValue?.productID && this.isEditProduct
        ? this.adminProductService.updateProduct(
            productFormValue,
            this.editProductValue.productID,
            this.deleteImages
          )
        : this.adminProductService.addProduct(productFormValue);

    submitProduct.subscribe(
      this.handleSuccess.bind(this),
      this.handleError.bind(this)
    );
  }

  private addImages(image: File) {
    if (
      image instanceof File &&
      image.type.match(/png|jpg|jpeg/) &&
      this.images.length < 4 &&
      !this.loading
    ) {
      this.images.push(this.fb.control(image, Validators.required));
      !this.isChangesOccurred && this.changesSavedEvent.emit(false);
      this.isChangesOccurred = true;
    }
  }

  private removeImage(index: number) {
    if (this.images.length && index <= this.images.length && !this.loading) {
      const removeImage = this.images.at(index).value;
      this.deleteImages.push(removeImage);
      this.images.removeAt(index);
      !this.isChangesOccurred && this.changesSavedEvent.emit(false);
      this.isChangesOccurred = true;
    }
  }

  private handleError(error: FirebaseError) {
    this.productForm.disable();
    this.loading = false;
  }

  private handleSuccess() {
    this.productForm.disable();
    this.changesSavedEvent.emit(true);
    this.loading = false;
    this.router.navigate(['/admin/products']);
  }

  // Form Getters

  get title() {
    return this.productForm.get('title');
  }

  get category() {
    return this.productForm.get('category');
  }

  get originalPrice() {
    return this.productForm.get('originalPrice');
  }

  get offerPrice() {
    return this.productForm.get('offerPrice');
  }

  get rating() {
    return this.productForm.get('rating');
  }

  get description() {
    return this.productForm.get('description');
  }

  get images() {
    return this.productForm.get('images') as FormArray;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
