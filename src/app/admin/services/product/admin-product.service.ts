import { Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { forkJoin, from, Observable, of } from 'rxjs';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class AdminProductService {
  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private productService: ProductService
  ) {}

  getAllProduct(): Observable<Product[]> {
    return this.productService.getAllProduct();
  }

  getProduct(productID: string): Observable<Product> {
    return this.productService.getProduct(productID);
  }

  addProduct(newProduct: Product): Observable<string> {
    const collectionRef = collection(this.firestore, `products`);
    const { id: productID } = doc(collectionRef);

    const updatedProduct = this.updateProductWithUrl(newProduct, productID);

    return updatedProduct.pipe(
      concatMap((product) => {
        const docRef = doc(this.firestore, `products/${productID}`);
        return setDoc(docRef, product)
          .then(this.handleSuccess.bind(this, 'Product Added Successfully!!'))
          .catch(this.handleError.bind(this));
      })
    );
  }

  updateProduct(
    product: Product,
    productID: string,
    deleteImages: string[]
  ): Observable<string> {
    const updatedProduct = this.updateProductWithUrl(product, productID);

    return updatedProduct.pipe(
      concatMap((product: any) => {
        const docRef = doc(this.firestore, `products/${productID}`);
        if (deleteImages.length)
          deleteImages.forEach(this.removeImage.bind(this));
        return updateDoc(docRef, product)
          .then(this.handleSuccess.bind(this, 'Product Updated Successfully!!'))
          .catch(this.handleError.bind(this));
      })
    );
  }

  deleteProduct(product: Product, productID: string): Observable<string> {
    const { images } = product;

    const deleteImages = [...images].map((image) =>
      typeof image === 'string' ? this.removeImage(image) : of(image)
    );

    return forkJoin(deleteImages).pipe(
      switchMap(() => {
        const docRef = doc(this.firestore, `products/${productID}`);
        return deleteDoc(docRef)
          .then(this.handleSuccess.bind(this, `Product Deleted Successfully!!`))
          .catch(this.handleError.bind(this));
      })
    );
  }

  private updateProductWithUrl(
    product: Product,
    productID: string
  ): Observable<Product> {
    const { images } = product;

    const imagesUrl$: Observable<string>[] = [...images].map((file) =>
      file instanceof File ? this.addImage(file, productID) : of(file)
    );

    return forkJoin(imagesUrl$).pipe(
      map((imagesUrl) => ({ ...product, images: imagesUrl } as Product))
    );
  }

  private addImage(imageFile: File, productID: string): Observable<string> {
    const path = `products_images/${productID}/${Date.now()}_${imageFile.name}`;
    const storageRef = ref(this.storage, path);
    return from(uploadBytes(storageRef, imageFile)).pipe(
      switchMap(() => getDownloadURL(storageRef))
    );
  }

  private removeImage(url: string): Promise<string> {
    const storageRef = ref(this.storage, url);
    return deleteObject(storageRef)
      .then(this.handleSuccess.bind(this, 'Image Removed Successfully!!'))
      .catch(this.handleError.bind(this));
  }

  private handleError(error: Error): string {
    throw new Error(error.message);
  }

  private handleSuccess(message: string): string {
    return message;
  }
}
