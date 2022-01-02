import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AlertComponent } from 'shared/components/alert/alert.component';
import { snackBarConfig } from 'shared/config/snack-bar-config';
import { Shipping } from 'shared/models/shipping';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'your-addresses',
  templateUrl: './your-addresses.component.html',
  styleUrls: ['./your-addresses.component.scss'],
})
export class YourAddressesComponent implements OnInit, OnDestroy {
  pageLoading = false;
  addresses?: Shipping[];
  error: Error | null = null;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.pageLoading = true;

    this.subscriptions.add(
      this.userService
        .getAddress()
        .subscribe(
          this.handleAddressSuccess.bind(this),
          this.handleAddressError.bind(this)
        )
    );
  }

  navigate(path: string) {
    this.router.navigate([path], { relativeTo: this.route });
  }

  deleteAddress(addressID: string) {
    this.showDeleteMatDialog()
      .pipe(
        filter((res) => !!res),
        switchMap(() => this.userService.deleteAddress(addressID))
      )
      .subscribe(this.showSnackBar.bind(this));
  }

  private showDeleteMatDialog() {
    const deleteAlertRef = this.matDialog.open<AlertComponent, any, boolean>(
      AlertComponent,
      {
        data: {
          title: `Delete Address`,
          body: ` Do you want to delete this address?`,
          confirmButton: `Delete`,
          cancelButton: `Cancel`,
        },
        width: '95%',
        maxWidth: 500,
        panelClass: 'mat-dialog-box',
      }
    );

    return deleteAlertRef.afterClosed();
  }

  private handleAddressSuccess(addresses: Shipping[]) {
    this.addresses = addresses;
    this.pageLoading = false;
  }

  private handleAddressError(error: Error) {
    this.error = error;
    this.pageLoading = false;
  }

  private showSnackBar(message: string) {
    this.matSnackBar.open(message, undefined, snackBarConfig);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
