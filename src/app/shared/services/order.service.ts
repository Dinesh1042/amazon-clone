import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { from, Observable, of, throwError } from 'rxjs';
import { mapTo, switchMap, take } from 'rxjs/operators';
import { MyOrder, MyOrders } from 'shared/models/my-orders';
import { Order } from 'shared/models/order';
import { OrderSuccess } from 'shared/models/orderSuccess';

import { ShoppingCartService } from './shopping-cart.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private firestore: Firestore,
    private userService: UserService,
    private cartService: ShoppingCartService
  ) {}

  placeOrder(order: Order) {
    return this.userService.appUser$.pipe(
      switchMap((user) => {
        if (!user) return throwError('No User Found!');

        const { uid } = user;

        const collectionRef = collection(this.firestore, `orders`);
        const { id: orderId } = doc(collectionRef);

        const docRef = doc(this.firestore, `/orders/${uid}`);

        const newOrder = {
          [orderId]: { ...order, orderPlaced: new Date().getTime() },
        };

        return from(setDoc(docRef, newOrder, { merge: true })).pipe(
          switchMap(() => this.cartService.removeCart()),
          mapTo(newOrder)
        );
      }),
      take(1)
    ) as Observable<OrderSuccess>;
  }

  getOrders() {
    return this.userService.appUser$.pipe(
      switchMap((user) =>
        !user?.uid
          ? throwError('No User Found!')
          : docData(doc(this.firestore, `/orders/${user.uid}`))
      )
    ) as Observable<MyOrders>;
  }

  getOrderById(orderId: string) {
    return this.getOrders().pipe(
      switchMap((orders) =>
        orders && orders[orderId]
          ? of(orders[orderId])
          : throwError(
              new Error('We cannot find the order what you are looking for.')
            )
      ),
      take(1)
    ) as Observable<MyOrder>;
  }
}
