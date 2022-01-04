import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserImageEditComponent } from '../user-image-edit/user-image-edit.component';

@Component({
  selector: 'user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.scss'],
})
export class UserImageComponent {
  @Input('photoURL') get photoURL() {
    return this._photoURL;
  }
  set photoURL(value: string | null) {
    this._photoURL = value || this.defaultImage;
  }
  @Input('displayName') displayName!: string;

  private defaultImage = 'assets/icons/person.svg';
  private _photoURL = this.defaultImage;

  constructor(private dialog: MatDialog) {}

  editUserImage() {
    this.dialog.open(UserImageEditComponent, {
      data: {
        photoURL: this.photoURL,
        displayName: this.displayName,
        defaultImage: this.defaultImage,
        isDefaultImage: this.photoURL === this.defaultImage,
      },
      maxWidth: 450,
      width: '95%',
      panelClass: 'mat-dialog-box',
    });
  }
}
