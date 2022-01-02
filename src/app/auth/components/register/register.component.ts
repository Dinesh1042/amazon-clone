import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseError } from '@firebase/util';
import { User } from 'firebase/auth';
import { take } from 'rxjs/operators';
import { snackBarConfig } from 'shared/config/snack-bar-config';
import { NewUser } from 'shared/models/new-user';
import { AuthService } from 'shared/services/auth.service';

import { AuthErrorService } from '../../services/auth-error.service';
import { AuthSuccessService } from '../../services/auth-success.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authErrorService: AuthErrorService,
    private authSuccessService: AuthSuccessService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      username: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  registerUser() {
    if (this.registerForm.invalid || this.loading) return;

    this.loading = true;
    this.registerForm.disable();

    const newUserData: NewUser = this.registerForm.value;
    this.authService
      .createAccount(newUserData)
      .pipe(take(1))
      .subscribe(
        this.handleAuthSuccess.bind(this),
        this.handleAuthError.bind(this)
      );
  }

  private handleAuthError(error: FirebaseError) {
    this.registerForm.enable();
    this.authErrorService.setAuthError(error.code);
    this.loading = false;
  }

  private handleAuthSuccess(user: User) {
    this.registerForm.enable();
    this.authSuccessService.navigateUser();
    this.authErrorService.removeAuthError();
    this.loading = false;
    this.showSnackBar(user.displayName || 'User');
  }

  private showSnackBar(name: string) {
    this.snackbar.open(
      `Hi ${name}! Welcome to Amazon.`,
      undefined,
      snackBarConfig
    );
  }

  // Form Getters

  get name() {
    return this.registerForm.get('name');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
