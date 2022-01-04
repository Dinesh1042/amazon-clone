import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from 'shared/config/snack-bar-config';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'user-profile-form',
  templateUrl: './user-profile-form.component.html',
})
export class UserProfileFormComponent implements OnInit {
  userForm: FormGroup;
  email?: string;
  updateLoading = false;
  error: Error | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) private userProfile: UserProfile,
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserProfileFormComponent>,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      displayName: [null, [Validators.required, Validators.minLength(3)]],
      username: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.userProfile);
    this.email = this.userProfile.email;
  }

  updateProfile() {
    if (this.userForm.dirty) {
      this.userForm.disable();
      this.updateLoading = true;
      this.dialogRef.disableClose = true;
      this.error = null;

      this.userService
        .updateUser(this.userForm.value)
        .subscribe(
          this.handleUpdateProfileSuccess.bind(this),
          this.handleUpdateProfileError.bind(this)
        );
    } else this.onNoClick();
  }

  onNoClick() {
    !this.dialogRef.disableClose && this.dialogRef.close();
  }

  private handleUpdateProfileSuccess(message: string) {
    this.userForm.enable();
    this.updateLoading = false;
    this.dialogRef.disableClose = false;
    this.dialogRef.close();
    this.showSnackBar(message);
  }

  private handleUpdateProfileError(error: Error) {
    this.userForm.enable();
    this.dialogRef.disableClose = false;
    this.updateLoading = false;
    this.error = error;
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, undefined, snackBarConfig);
  }

  // Form Getters

  get displayName() {
    return this.userForm.get('displayName');
  }

  get username() {
    return this.userForm.get('username');
  }
}

interface UserProfile {
  displayName: string;
  username: string;
  email: string;
}
