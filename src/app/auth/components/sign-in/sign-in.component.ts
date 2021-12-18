import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseError } from '@firebase/util';
import { take } from 'rxjs/operators';
import { SignInUser } from 'shared/models/sign-in-user';
import { AuthService } from 'shared/services/auth.service';

import { AuthErrorService } from '../../services/auth-error.service';
import { AuthSuccessService } from '../../services/auth-success.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  signInForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authErrorService: AuthErrorService,
    private authSuccessService: AuthSuccessService
  ) {
    this.signInForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  signUser() {
    if (this.signInForm.invalid || this.loading) return;

    this.loading = true;
    this.signInForm.disable();

    const signInData: SignInUser = this.signInForm.value;
    this.authService
      .signInWithEmailAndPassword(signInData)
      .pipe(take(1))
      .subscribe(
        this.handleAuthSuccess.bind(this),
        this.handleAuthError.bind(this)
      );
  }

  private handleAuthError(error: FirebaseError) {
    this.signInForm.enable();
    this.authErrorService.setAuthError(error.code);
    this.loading = false;
  }

  private handleAuthSuccess() {
    this.signInForm.enable();
    this.authErrorService.removeAuthError();
    this.authSuccessService.navigateUser();
    this.loading = false;
  }

  // Form Getters

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }
}
