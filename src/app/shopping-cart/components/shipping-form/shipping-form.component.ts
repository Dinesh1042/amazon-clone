import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, take } from 'rxjs/operators';
import { Shipping } from 'shared/models/shipping';
import { UserService } from 'shared/services/user.service';

import { AddressesComponent } from '../addresses/addresses.component';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
})
export class ShippingFormComponent implements OnInit {
  @Input('orderPlacedLoading') orderPlacedLoading = false;

  @Output('placeOrderEvent') placeOrderEvent = new EventEmitter();

  addresses?: Shipping[];
  shippingFormValue?: Shipping;

  constructor(private userService: UserService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    // TODO: Create a separate method for getting addresses
    this.userService.appUser$
      .pipe(
        map((user) => (user && user.addresses ? user.addresses : [])),
        take(1)
      )
      .subscribe((addresses) => (this.addresses = addresses));
  }

  placeOrder(shippingForm: Shipping) {
    this.placeOrderEvent.emit(shippingForm);
  }

  showAddressDialog() {
    if (this.addresses?.length) {
      const addressesDialog = this.matDialog.open(AddressesComponent, {
        data: this.addresses,
        maxWidth: 650,
        width: '95%',
        panelClass: 'mat-dialog-box',
      });

      addressesDialog.afterClosed().subscribe((value) => {
        if (value) this.shippingFormValue = value;
      });
    }
  }
}
