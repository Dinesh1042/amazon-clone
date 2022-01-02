import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
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
import Fuse from 'fuse.js';
import { forkJoin, from, Observable, of } from 'rxjs';
import { concatMap, map, shareReplay, switchMap } from 'rxjs/operators';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: Firestore, private storage: Storage) {}

  getAllProduct(): Observable<Product[]> {
    const collectionRef = collection(this.firestore, `products`);
    return collectionData(collectionRef, { idField: 'productID' }).pipe(
      map((products) => products.map((product) => new Product(product))),
      shareReplay()
    );
  }

  getQueryProduct(query: string | null): Observable<Product[]> {
    return query
      ? this.getAllProduct().pipe(
          map((products) =>
            new Fuse(products, {
              keys: ['title', 'description'],
            }).search(query)
          ),
          map((products) =>
            products.map((product) => new Product(product.item))
          )
        )
      : this.getAllProduct();
  }

  getProduct(productID: string): Observable<Product> {
    const docRef = doc(this.firestore, `products/${productID}`);
    return docData(docRef, { idField: 'productID' }).pipe(
      map((product) => {
        if (product) return new Product(product);
        else throw new Error('No Product Found');
      })
    );
  }

  addProduct(newProduct: Product) {
    const collectionRef = collection(this.firestore, `products`);
    const { id } = doc(collectionRef);

    const updatedProduct = this.updateProductWithUrl(newProduct, id);

    return updatedProduct.pipe(
      concatMap((product) => {
        const docRef = doc(this.firestore, `products/${id}`);
        return setDoc(docRef, product)
          .then(this.handleSuccess.bind(this, 'Product Added Successfully!!'))
          .catch(this.handleError.bind(this));
      })
    );
  }

  updateProduct(product: Product, productID: string, deleteImages: string[]) {
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

  deleteProduct(product: Product, productID: string) {
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

  searchSuggestion(query: string) {
    return this.getQueryProduct(query).pipe(
      map((products) => {
        const slicedProduct = products.slice(0, 6);
        return [
          ...new Set(
            slicedProduct.map((product) =>
              product.title.split(' ').slice(0, 4).join(' ')
            )
          ),
        ];
      })
    );
  }

  getDealOfTheProducts() {
    return this.getAllProduct().pipe(
      map(
        (products) =>
          products
            .filter(
              (product) =>
                product.priceDifference > 100 && product.offerPercentage < 50
            )
            .sort(() => 0.5 - Math.random()) as Product[]
      )
    );
  }

  getFiftyPercentOffProducts() {
    return this.getAllProduct().pipe(
      map(
        (products) =>
          products
            .filter((product) => product.offerPercentage >= 50)
            .sort(() => 0.5 - Math.random()) as Product[]
      )
    );
  }

  private updateProductWithUrl(product: Product, productID: string) {
    const { images } = product;

    const imagesUrl$: Observable<string>[] = [...images].map((file) =>
      file instanceof File ? this.addImage(file, productID) : of(file)
    );

    return forkJoin(imagesUrl$).pipe(
      map((imagesUrl) => ({ ...product, images: imagesUrl } as Product))
    );
  }

  private addImage(imageFile: File, productID: string) {
    const path = `products_images/${productID}/${Date.now()}_${imageFile.name}`;
    const storageRef = ref(this.storage, path);
    return from(uploadBytes(storageRef, imageFile)).pipe(
      switchMap(() => getDownloadURL(storageRef))
    );
  }

  private removeImage(url: string) {
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
