import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { from, Observable, of, throwError } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { Order, OrderInterface } from 'shared/models/orders/order';

import { Orders, OrdersInterface } from 'shared/models/orders/orders';

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

  placeOrder(order: OrderInterface): Observable<OrdersInterface> {
    return this.userService.appUser$.pipe(
      switchMap((user) => {
        if (!user) return throwError(new Error('No User!'));

        const collectionRef = collection(this.firestore, `orders`);
        const { id: orderId } = doc(collectionRef);

        const docRef = doc(this.firestore, `/orders/${user.uid}`);
        const newOrder = {
          [orderId]: order,
        };

        return from(setDoc(docRef, newOrder, { merge: true })).pipe(
          switchMap(() => this.cartService.removeCart()),
          mapTo(newOrder)
        );
      })
    );
  }

  getOrders() {
    return this.userService.appUser$.pipe(
      switchMap((user) => {
        if (!user) return throwError(new Error('No User'));

        const docRef = doc(this.firestore, `/orders/${user.uid}`);
        return docData(docRef).pipe(map((orders) => new Orders(orders)));
      })
    );
  }

  getOrder(orderId: string) {
    return this.getOrders().pipe(
      switchMap(({ ordersMap }) => {
        const currentOrder = ordersMap[orderId];

        if (!currentOrder)
          return throwError(
            new Error('We cannot find the order what you are looking for!')
          );

        return of(new Order(currentOrder, orderId));
      })
    );
  }
}
