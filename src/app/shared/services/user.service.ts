import { Injectable } from '@angular/core';
import { Auth, authState, updateProfile } from '@angular/fire/auth';
import {
  collection,
  doc,
  docData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { deleteField } from 'firebase/firestore';
import { forkJoin, from, Observable, of, throwError } from 'rxjs';
import { map, mapTo, shareReplay, switchMap, take } from 'rxjs/operators';
import { arrayContainsObj } from 'shared/helpers/array-contains-obj';
import { Shipping } from 'shared/models/shipping';
import { User, UserInterface } from 'shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$ = authState(this.auth);

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}

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

  // Address

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

  // User Image

  updateUserImage(imageFile: File) {
    return this.modifyUserImage(imageFile);
  }

  removeUserImage() {
    return this.modifyUserImage(null);
  }

  updateUser(userData: {
    displayName?: string;
    photoURL?: string | null;
  }): Observable<string> {
    return this.getUser().pipe(
      switchMap(({ uid }) => {
        const docRef = doc(this.firestore, `/users/${uid}`);
        return from(updateDoc(docRef, userData)).pipe(mapTo(`User Updated`));
      })
    );
  }

  private modifyUserImage(imageFile: File | null) {
    return this.getUser().pipe(
      // Deleting the existing image in storage
      switchMap(
        (user) =>
          (user.photoURL &&
            from(this.deleteUserImageFromStorage(user.photoURL)).pipe(
              mapTo(user)
            )) ||
          of(user)
      ),
      switchMap(
        ({ uid }) =>
          (imageFile && this.saveUserImage(uid, imageFile)) || of(null)
      ),
      switchMap((photoURL) =>
        forkJoin([
          this.updateFirebaseUser({ photoURL }),
          this.updateUser({ photoURL }),
        ]).pipe(mapTo(imageFile ? 'Profile Updated' : 'Profile Removed'))
      )
    );
  }

  private updateFirebaseUser(userData: {
    displayName?: string;
    photoURL?: string | null;
  }): Observable<string> {
    return this.user$.pipe(
      switchMap((user) => {
        if (!user) return throwError(new Error('No User Found!'));
        return updateProfile(user, userData).then(() => 'User Profile Updated');
      }),
      take(1)
    );
  }

  private saveUserImage(uid: string, imageFile: File): Observable<string> {
    const path = `users_image/${uid}/${Date.now()}_${imageFile.name}`;
    const storageRef = ref(this.storage, path);
    return from(uploadBytes(storageRef, imageFile)).pipe(
      switchMap(() => getDownloadURL(storageRef))
    );
  }

  private async deleteUserImageFromStorage(photoURL: string): Promise<string> {
    await deleteObject(ref(this.storage, photoURL));
    return 'Image Removed';
  }

  private updateAddressWithUID(
    uid: string,
    addressID: string,
    address: Shipping
  ): Observable<string> {
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

  private getUserByUID(uid: string): Observable<UserInterface> {
    const docRef = doc(this.firestore, `/users/${uid}`);

    return docData(docRef).pipe(
      map((data) => (data ? data : throwError(new Error('No Data Found!'))))
    ) as Observable<UserInterface>;
  }
}
