import { Component, EventEmitter, Input } from '@angular/core';
import { Product } from 'shared/models/product';

@Component({
  selector: 'admin-product-card',
  templateUrl: './admin-product-card.component.html',
  styleUrls: ['./admin-product-card.component.scss'],
})
export class AdminProductCardComponent {
  @Input('product') get product() {
    return this._product;
  }
  set product(value: Product) {
    this._product = value;
  }

  mainImageIndex = 0;
  addImageEvent$ = new EventEmitter<File>();
  removeImageEvent$ = new EventEmitter<number>();

  private _product = {} as Product;

  constructor() {}

  onChange(event: any | File[]) {
    const files: File[] = Array.isArray(event)
      ? event
      : [...event.target.files];

    files.forEach(
      (file) =>
        file.type.match(/jpg|png|jpeg/) && this.addImageEvent$.emit(file)
    );
  }

  removeImage(event: Event, index: number) {
    event.stopPropagation();
    this.removeImageEvent$.emit(index);
    if (
      this.mainImageIndex === index ||
      !this.product.images[this.mainImageIndex]
    )
      this.mainImageIndex = 0;
  }
}
