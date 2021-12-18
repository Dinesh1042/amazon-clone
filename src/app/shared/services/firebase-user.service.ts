import { Inject, Injectable } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';
import { User } from '@firebase/auth';
import { doc, setDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseUserService {
  constructor(
    private firestore: Firestore,
    @Inject('amazonCartId') private amazonCart: string
  ) {}

  saveUser(user: User, username: string) {
    const { uid, displayName, email, photoURL } = user;
    const docs = doc(this.firestore, `/users/${uid}`);
    return setDoc(docs, {
      displayName,
      email,
      username,
      photoURL,
      uid,
      shoppingCartId: this.getNewUserCartId(),
    });
  }

  private getNewUserCartId() {
    const localCartId = localStorage.getItem(this.amazonCart);
    if (localCartId) return localCartId;

    const collectionRef = collection(this.firestore, `products`);
    const { id } = doc(collectionRef);
    return id;
  }
}
