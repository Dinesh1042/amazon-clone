import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from 'shared/config/snack-bar-config';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'user-image-edit',
  templateUrl: './user-image-edit.component.html',
  styleUrls: ['./user-image-edit.component.scss'],
})
export class UserImageEditComponent {
  selectedImage: File | null = null;
  updateLoading = false;
  removeImageLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public userProfile: UserProfile,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserImageEditComponent>,
    private snackBar: MatSnackBar
  ) {}

  handleInputImage(event: any) {
    const [userImg]: File[] = Array.from(event.target.files);
    this.selectedImage = userImg;
    this.userProfile = { ...this.userProfile, photoURL: userImg };
  }

  updateImage() {
    if (this.selectedImage && !this.updateLoading) {
      this.updateLoading = true;
      this.dialogRef.disableClose = true;
      this.userService
        .updateUserImage(this.selectedImage)
        .subscribe(
          this.handleUpdateImageSuccess.bind(this),
          this.handleUpdateImageError.bind(this)
        );
    }
  }

  removeImage() {
    if (!this.userProfile.isDefaultImage) {
      this.userProfile.photoURL = null;
      this.removeImageLoading = true;
      this.dialogRef.disableClose = true;

      this.userService
        .removeUserImage()
        .subscribe(
          this.handleRemoveImageSuccess.bind(this),
          this.handleRemoveImageError.bind(this)
        );
    }
  }

  onNoClick() {
    !this.dialogRef.disableClose && this.dialogRef.close();
  }

  private handleUpdateImageSuccess(message: string) {
    this.dialogRef.disableClose = false;
    this.updateLoading = false;
    this.showSnackBar(message);
    this.dialogRef.close();
  }

  private handleUpdateImageError(error: Error) {
    this.dialogRef.disableClose = false;
    this.updateLoading = false;
    this.showSnackBar(error.message);
  }

  private handleRemoveImageSuccess(message: string) {
    this.dialogRef.disableClose = false;
    this.removeImageLoading = false;
    this.showSnackBar(message);
    this.dialogRef.close();
  }

  private handleRemoveImageError(error: Error) {
    this.dialogRef.disableClose = false;
    this.removeImageLoading = false;
    this.showSnackBar(error.message);
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, undefined, snackBarConfig);
  }
}

interface UserProfile {
  displayName: string;
  photoURL: string | File | null;
  defaultImage: string;
  isDefaultImage: boolean;
}
