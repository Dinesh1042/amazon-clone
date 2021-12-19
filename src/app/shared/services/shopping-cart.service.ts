import { Inject, Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { of } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { ShoppingCartProductFactory } from 'shared/helpers/shopping-cart-product';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(
    private firestore: Firestore,
    private userService: UserService,
    @Inject('amazonCartId') private amazonCart: string
  ) {}

  getCart() {
    const shoppingCartId = this.getCartId();

    return shoppingCartId.pipe(
      switchMap((cartId) => {
        const docRef = doc(this.firestore, `shopping_cart/${cartId}`);
        return docData(docRef).pipe(
          distinctUntilChanged(),
          map(
            (cartProducts) => new ShoppingCart(cartProducts ? cartProducts : {})
          )
        );
      }),
      shareReplay(1)
    );
  }

  addToCart(product: Product) {
    const shoppingCartId = this.getCartId();

    const shoppingCartProduct = {
      [product.pid!]: {
        product: ShoppingCartProductFactory(product),
        quantity: 1,
      },
    };

    return shoppingCartId.pipe(
      switchMap((cartId) => {
        const docRef = doc(this.firestore, `shopping_cart/${cartId}`);
        return setDoc(docRef, shoppingCartProduct, { merge: true })
          .then(this.handleSuccess.bind(this, `Product Added to Cart!`))
          .catch(this.handleError.bind(this));
      })
    );
  }

  increaseProductQuantity(pid: string) {
    return this.getCartProduct(pid).pipe(
      switchMap(({ quantity }) =>
        this.updateCartQuantity(pid, quantity + 1, true)
      )
    );
  }

  decreaseProductQuantity(pid: string) {
    return this.getCartProduct(pid).pipe(
      switchMap(({ quantity }) => {
        const newQuantity = quantity - 1;
        return newQuantity <= 0
          ? this.removeCartItem(pid)
          : this.updateCartQuantity(pid, newQuantity, false);
      })
    );
  }

  removeCartItem(pid: string) {
    const shoppingCartId = this.getCartId();

    return shoppingCartId.pipe(
      switchMap((cartId) => {
        const docRef = doc(this.firestore, `shopping_cart/${cartId}`);
        return updateDoc(docRef, {
          [pid]: deleteField(),
        })
          .then(this.handleSuccess.bind(this, `Product has removed from cart!`))
          .catch(this.handleError.bind(this));
      })
    );
  }

  removeCart() {
    return this.getCartId().pipe(
      switchMap((cartId) =>
        deleteDoc(doc(this.firestore, `shopping_cart/${cartId}`)).then(
          this.handleSuccess.bind(this, 'Cart has been removed')
        )
      )
    );
  }

  private removeCartWithCartId(cartId: string) {
    const docRef = doc(this.firestore, `shopping_cart/${cartId}`);
    return deleteDoc(docRef).then(
      this.handleSuccess.bind(this, 'Cart has been removed')
    );
  }

  private getCartProduct(pid: string) {
    const shoppingCart = this.getCart().pipe(take(1));

    return shoppingCart.pipe(map((cart) => cart.shoppingCartMap[pid]));
  }

  //TODO: Increase by only one at a time
  private updateCartQuantity(
    pid: string,
    quantity: number,
    isProductIncreased: boolean = false
  ) {
    const shoppingCartId = this.getCartId();

    return shoppingCartId.pipe(
      switchMap((cartId) => {
        const docRef = doc(this.firestore, `shopping_cart/${cartId}`);
        return updateDoc(docRef, {
          [`${pid}.quantity`]: quantity,
        })
          .then(
            this.handleSuccess.bind(
              this,

              `Product Quantity has ${
                isProductIncreased ? 'increased' : 'decreased'
              }!`
            )
          )
          .catch(this.handleError.bind(this));
      })
    );
  }

  private getCartId() {
    const localCartId = of(localStorage.getItem(this.amazonCart));

    return localCartId.pipe(
      switchMap((cartId) =>
        cartId
          ? of(cartId)
          : this.userService.appUser$.pipe(
              switchMap((user) =>
                of(user ? user.shoppingCartId : this.createNewCartId())
              ),
              tap(this.saveLocal.bind(this, this.amazonCart)), // Side Effect for storing CartId in LocalStorage
              take(1)
            )
      ),
      take(1),
      shareReplay(1)
    );
  }

  private createNewCartId() {
    const collectionRef = collection(this.firestore, `shopping_cart`);
    const { id: cartId } = doc(collectionRef);
    return cartId;
  }

  private saveLocal(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private handleError(error: Error): Error {
    throw new Error(error.message);
  }

  private handleSuccess(message: string) {
    return message;
  }

  checkExistingCart() {
    return this.userService.appUser$.pipe(
      distinctUntilChanged(),
      switchMap((user) =>
        !user
          ? of(`No User!`)
          : this.getCartId().pipe(
              switchMap((cartId) =>
                user.shoppingCartId === cartId
                  ? of(`Same shoppingCart Id`)
                  : this.updateOldCartDataWithNewCartData(
                      user.shoppingCartId,
                      cartId
                    )
              ),
              take(1)
            )
      ),
      take(1)
    );
  }

  private updateOldCartDataWithNewCartData(
    oldCartId: string,
    newCartId: string
  ) {
    return this.getShoppingCart(newCartId).pipe(
      switchMap((newCartData) =>
        !newCartData
          ? of('NewCart Data is Empty')
          : this.getShoppingCart(oldCartId).pipe(
              switchMap((oldCartData) =>
                this.mergeShoppingCart(oldCartId, oldCartData, newCartData)
              )
            )
      ),
      map(() => this.saveLocal(this.amazonCart, oldCartId)),
      switchMap(() => this.removeCartWithCartId(newCartId))
    );
  }

  private getShoppingCart(cartId: string) {
    const docRef = doc(this.firestore, `shopping_cart/${cartId}`);
    return docData(docRef).pipe(take(1));
  }

  private mergeShoppingCart(
    oldCartId: string,
    oldCartData: { [pid: string]: any } = {},
    newCartData: { [pid: string]: any } = {}
  ) {
    const updatedCartData = { ...oldCartData, ...newCartData };
    const docRef = doc(this.firestore, `shopping_cart/${oldCartId}`);

    return setDoc(docRef, updatedCartData).then(
      this.handleSuccess.bind(this, `Data Merged`)
    );
  }
}
