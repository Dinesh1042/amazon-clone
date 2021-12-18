import { Inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from '@angular/fire/auth';
import { from, of } from 'rxjs';
import { exhaustMap, map, mapTo, pluck, switchMap, take } from 'rxjs/operators';

import { NewUser } from '../models/new-user';
import { SignInUser } from '../models/sign-in-user';
import { FirebaseUserService } from './firebase-user.service';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = authState(this.auth);

  constructor(
    private auth: Auth,
    private firebaseUser: FirebaseUserService,
    private cartService: ShoppingCartService,
    @Inject('amazonCartId') private amazonCart: string
  ) {
    this.user$
      .pipe(
        take(1),
        switchMap((user) =>
          user ? this.cartService.checkExistingCart() : of(null)
        )
      )
      .subscribe();
  }

  createAccount(newUserCredential: NewUser) {
    const { name: displayName, username } = newUserCredential;

    return of(newUserCredential).pipe(
      exhaustMap(({ email, password }) =>
        createUserWithEmailAndPassword(this.auth, email, password)
      ),
      switchMap(({ user }) => this.updateProfile(user, displayName)),
      switchMap((user) =>
        from(this.firebaseUser.saveUser(user, username)).pipe(mapTo(user))
      )
    );
  }

  signInWithEmailAndPassword(signInUserCredential: SignInUser) {
    return of(signInUserCredential).pipe(
      exhaustMap(({ email, password }) =>
        from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
          switchMap((user) =>
            this.cartService.checkExistingCart().pipe(
              take(1),
              map(() => user)
            )
          )
        )
      ),
      pluck('user')
    );
  }

  private updateProfile(user: User, displayName: string) {
    return from(
      updateProfile(user, {
        displayName,
      })
    ).pipe(mapTo(user));
  }

  //TODO: - Forget Password

  forgetPassword(email: string) {
    sendPasswordResetEmail(this.auth, email);
  }

  signOut() {
    return this.auth.signOut().then(this.clearLocalStorageCardId.bind(this));
  }

  private clearLocalStorageCardId() {
    localStorage.removeItem(this.amazonCart);
  }
}
