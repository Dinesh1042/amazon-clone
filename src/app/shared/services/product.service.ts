import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
} from '@angular/fire/firestore';
import Fuse from 'fuse.js';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: Firestore) {}

  getAllProduct(): Observable<Product[]> {
    const collectionRef = collection(this.firestore, `products`);
    return collectionData(collectionRef, { idField: 'productID' }).pipe(
      map((products) => products.map((product) => new Product(product))),
      shareReplay(1)
    );
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

  searchSuggestion(query: string): Observable<string[]> {
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

  getDealOfTheProducts(): Observable<Product[]> {
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

  getFiftyPercentOffProducts(): Observable<Product[]> {
    return this.getAllProduct().pipe(
      map(
        (products) =>
          products
            .filter((product) => product.offerPercentage >= 50)
            .sort(() => 0.5 - Math.random()) as Product[]
      )
    );
  }
}
