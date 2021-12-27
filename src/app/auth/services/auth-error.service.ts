import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthErrorService {
  private authErrorSubject = new BehaviorSubject<string | null>(null);

  authError$ = this.authErrorSubject.asObservable();

  constructor() {}

  setAuthError(code: string) {
    this.authErrorSubject.next(this.getError(code));
  }

  removeAuthError() {
    this.authErrorSubject.next(null);
  }

  private getError(code: string) {
    const errors: { [key: string]: string } = {
      'auth/wrong-password': 'Your password is incorrect.',
      'auth/email-already-exists.':
        'The provided email is already in use by an existing user.',
      'auth/user-not-found':
        'We cannot find an account with that email address.',
      'auth/email-already-in-use':
        'The provided email is already in use by an existing user.',
    };

    return errors[code] || code;
  }
}
