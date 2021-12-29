import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import {
  collection,
  doc,
  docData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { deleteField } from 'firebase/firestore';
import { from, Observable, of, throwError } from 'rxjs';
import { map, mapTo, shareReplay, switchMap, take } from 'rxjs/operators';
import { arrayContainsObj } from 'shared/helpers/array-contains-obj';
import { Shipping } from 'shared/models/shipping';
import { User, UserInterface } from 'shared/models/user';

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
      shareReplay(1),
      map((user) => new User(user))
    );
  }

  getUser() {
    return this.appUser$.pipe(take(1));
  }

  getAddress(): Observable<Shipping[]> {
    return this.appUser$.pipe(map((user) => user.addresses));
  }

  getAddressByID(addressID: string): Observable<Shipping> {
    return this.getUser().pipe(
      switchMap((user) => {
        const address = user.addressesMap[addressID];
        if (address) return of(address);

        return throwError(
          new Error('We could not find the address what you are looking for.')
        );
      })
    );
  }

  saveAddress(address: Shipping) {
    return this.getUser().pipe(
      switchMap((user) => {
        // removing address id
        const addresses = user.addresses.map(({ addressID, ...rest }) => rest);

        if (arrayContainsObj(addresses, address))
          return throwError(new Error('Address was already added'));

        const addressID = this.getRandomFirestoreID('users');

        return this.updateAddressWithUID(user.uid, addressID, address);
      })
    );
  }

  updateAddress(addressID: string, address: Shipping) {
    return this.getUser().pipe(
      switchMap(({ uid }) => this.updateAddressWithUID(uid, addressID, address))
    );
  }

  deleteAddress(addressID: string) {
    return this.getUser().pipe(
      switchMap(async ({ uid }) => {
        const docRef = doc(this.firestore, `/users/${uid}`);
        await updateDoc(docRef, {
          [`addresses.${addressID}`]: deleteField(),
        });
        return 'Address Removed';
      })
    );
  }

  private updateAddressWithUID(
    uid: string,
    addressID: string,
    address: Shipping
  ) {
    const docRef = doc(this.firestore, `/users/${uid}`);

    return from(
      updateDoc(docRef, {
        [`addresses.${addressID}`]: address,
      })
    ).pipe(mapTo('Address Added'));
  }

  private getRandomFirestoreID(collectionName: string): string {
    const collectionRef = collection(this.firestore, collectionName);
    return doc(collectionRef).id;
  }

  //? UpdateUser -
  //?               - Should be implemented
  //? DeleteUser -

  private getUserByUID(uid: string): Observable<UserInterface> {
    const docRef = doc(this.firestore, `/users/${uid}`);

    return docData(docRef).pipe(
      map((data) => (data ? data : throwError(new Error('No Data Found!'))))
    ) as Observable<UserInterface>;
  }
}
