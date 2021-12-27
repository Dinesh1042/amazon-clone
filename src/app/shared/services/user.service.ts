import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import {
  arrayUnion,
  doc,
  docData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable, of, throwError } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';
import { arrayContainsObj } from 'shared/helpers/array-contains-obj';
import { Shipping } from 'shared/models/shipping';
import { User } from 'shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$ = authState(this.auth);

  constructor(private auth: Auth, private firestore: Firestore) {}

  get appUser$() {
    return this.user$.pipe(
      switchMap((firebaseUser) =>
        firebaseUser
          ? this.getUserByUID(firebaseUser.uid)
          : throwError(new Error('No User Found!'))
      ),
      shareReplay(1)
    );
  }

  getUser() {
    return this.appUser$.pipe(take(1));
  }

  updateCartId(cartId: string) {
    return this.appUser$.pipe(
      switchMap((user) => {
        if (!user) return of(null);
        const docRef = doc(this.firestore, `/users/${user.uid}`);
        return updateDoc(docRef, { shoppingCartId: cartId }).then(() => cartId);
      })
    );
  }

  saveAnAddress(address: Shipping) {
    return this.getUser().pipe(
      switchMap((user) => {
        const addresses = user.addresses || [];

        if (!arrayContainsObj(addresses, address)) {
          const docRef = doc(this.firestore, `/users/${user.uid}`);
          return updateDoc(docRef, {
            addresses: arrayUnion(address),
          }).then(() => 'Address Added');
        }
        return of('Already was already added');
      })
    );
  }

  //? UpdateUser -
  //?               - Should be implemented
  //? DeleteUser -

  private getUserByUID(uid: string): Observable<User> {
    const docRef = doc(this.firestore, `/users/${uid}`);

    return docData(docRef).pipe(
      map((data) => (data ? data : throwError(new Error('No Data Found!'))))
    ) as Observable<User>;
  }
}
