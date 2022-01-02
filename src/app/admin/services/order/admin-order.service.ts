import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  orderBy,
  query,
  QueryConstraint,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { from, Observable, of, throwError } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Order, OrderInterface } from 'shared/models/order/order';

@Injectable({
  providedIn: 'root',
})
export class AdminOrderService {
  constructor(private firestore: Firestore) {}

  getOrder(orderID: string) {
    const orderRef = doc(this.firestore, `/orders/${orderID}`);

    return from(docData(orderRef)).pipe(
      switchMap((order) => {
        if (!order)
          return throwError(
            new Error('We Cannot find the order what you are looking for.')
          );

        return of(new Order({ ...order, orderID } as OrderInterface));
      })
    );
  }

  getUpcomingOrders() {
    return this.getOrderByQuery([where('isDelivered', '==', false)]);
  }

  getDeliveredOrders() {
    return this.getOrderByQuery([where('isDelivered', '==', true)]);
  }

  markOrderAsComplete(orderID: string) {
    return this.modifyOrderStatus(orderID, true);
  }

  markOrderAsUnComplete(orderID: string) {
    return this.modifyOrderStatus(orderID, false);
  }

  private modifyOrderStatus(
    orderID: string,
    isDelivered: boolean
  ): Observable<string> {
    const docRef = doc(this.firestore, `orders/${orderID}`);
    return from(updateDoc(docRef, { isDelivered })).pipe(
      map(() =>
        isDelivered ? 'The order has delivered' : 'The order has not delivered'
      )
    );
  }

  private getOrderByQuery(queries: QueryConstraint[]) {
    const collectionRef = collection(this.firestore, `orders`);
    const orderQuery = query(
      collectionRef,
      ...queries,
      orderBy('datePlaced', 'desc')
    );

    return collectionData(orderQuery, { idField: 'orderID' }).pipe(
      map((orders) =>
        orders.map((order) => new Order(order as OrderInterface))
      ),
      shareReplay(1)
    );
  }
}
