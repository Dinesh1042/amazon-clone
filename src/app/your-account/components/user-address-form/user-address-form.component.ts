import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from 'shared/components/alert/alert.component';
import { snackBarConfig } from 'shared/config/snack-bar-config';
import { isSameObj } from 'shared/helpers/is-same-obj';
import { Shipping } from 'shared/models/shipping';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'user-address-form',
  templateUrl: './user-address-form.component.html',
  styleUrls: ['./user-address-form.component.scss'],
})
export class UserAddressFormComponent implements OnInit {
  addressID: string | null = null;
  address = {} as Shipping;
  pageLoading = false;
  saveLoading = false;
  error: Error | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.pageLoading = true;
    this.addressID = this.route.snapshot.paramMap.get('addressId');

    if (this.addressID)
      this.userService
        .getAddressByID(this.addressID)
        .subscribe(
          this.handleAddressGETSuccess.bind(this),
          this.handleAddressGETError.bind(this)
        );
    else this.pageLoading = false;
  }

  saveAddress(address: Shipping) {
    this.saveLoading = true;

    if (!isSameObj(address, this.address)) {
      const saveAddressRes$ = !this.addressID
        ? this.userService.saveAddress(address)
        : this.userService.updateAddress(this.addressID, address);

      saveAddressRes$.subscribe(
        this.handleAddressSaveSuccess.bind(this),
        this.handleAddressSaveError.bind(this)
      );
    } else this.navigateToAddresses();
  }

  private handleAddressGETSuccess(address: Shipping) {
    this.address = address;
    this.pageLoading = false;
  }

  private handleAddressGETError(error: Error) {
    this.error = error;
    this.pageLoading = false;
  }

  private handleAddressSaveSuccess(message: string) {
    this.saveLoading = false;
    this.showSnackBar(message);
    this.navigateToAddresses();
  }

  private handleAddressSaveError(error: Error) {
    this.saveLoading = false;
    this.showAlertDialog('An Error Occurred', error.message);
  }

  private navigateToAddresses() {
    this.router.navigate(['/your-account/addresses']);
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, undefined, snackBarConfig);
  }

  private showAlertDialog(title: string, message: string) {
    this.dialog.open(AlertComponent, {
      data: {
        title,
        body: message,
        cancelButton: 'Close',
      },
      width: '95%',
      maxWidth: 500,
      panelClass: 'mat-dialog-box',
    });
  }
}
