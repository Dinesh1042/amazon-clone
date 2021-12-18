import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
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
        firebaseUser ? this.getUserByUID(firebaseUser.uid) : of(null)
      ),
      shareReplay(1)
    );
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

  //? UpdateUser -
  //?               - Should be implemented
  //? DeleteUser -

  private getUserByUID(uid: string): Observable<User | undefined> {
    const docRef = doc(this.firestore, `/users/${uid}`);
    return docData(docRef) as Observable<User | undefined>;
  }
}
