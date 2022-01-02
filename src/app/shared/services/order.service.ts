import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  orderBy,
  query,
  QueryConstraint,
  where,
} from '@angular/fire/firestore';
import { forkJoin, from, Observable, of, throwError } from 'rxjs';
import { catchError, map, mapTo, shareReplay, switchMap } from 'rxjs/operators';
import { Order, OrderInterface } from 'shared/models/order/order';

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

  storeOrder(order: OrderInterface): Observable<OrderInterface> {
    return this.userService.getUser().pipe(
      switchMap(({ uid }) => {
        const currentOrder: OrderInterface = {
          ...order,
          uid,
        };

        const collectionRef = collection(this.firestore, `orders`);

        return from(addDoc(collectionRef, currentOrder)).pipe(
          switchMap(({ id }) =>
            forkJoin([
              this.cartService.removeCart(),
              this.userService
                .saveAddress(order.shipping)
                .pipe(catchError(() => of(null))),
            ]).pipe(mapTo({ ...currentOrder, orderID: id }))
          )
        );
      })
    );
  }

  getOrders() {
    return this.getOrderByQuery([]);
  }

  getOrder(orderID: string) {
    const orderRef = doc(this.firestore, `/orders/${orderID}`);

    return from(getDoc(orderRef)).pipe(
      switchMap((order) => {
        if (!order.exists())
          return throwError(
            new Error('We Cannot find the order what you are looking for.')
          );

        return of(new Order({ ...order.data(), orderID } as OrderInterface));
      })
    );
  }

  getUpcomingOrders() {
    return this.getOrderByQuery([where('isDelivered', '==', false)]);
  }

  getDeliveredOrders() {
    return this.getOrderByQuery([where('isDelivered', '==', true)]);
  }

  private getOrderByQuery(queries: QueryConstraint[]) {
    return this.userService.getUser().pipe(
      switchMap(({ uid }) => {
        const collectionRef = collection(this.firestore, `/orders`);

        const orderQuery = query(
          collectionRef,
          where('uid', '==', uid),
          ...queries,
          orderBy('datePlaced', 'desc')
        );

        return collectionData(orderQuery, { idField: 'orderID' }).pipe(
          map((orders) =>
            orders.map((order) => new Order(order as OrderInterface))
          )
        );
      }),
      shareReplay(1)
    );
  }
}
