import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  shippingForm!: FormGroup;
  addresses: Shipping[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private matDialog: MatDialog
  ) {}

  placeOrder() {
    this.shippingForm.valid &&
      this.placeOrderEvent.emit(this.shippingForm.value);
  }

  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      doorNo: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
    });

    this.userService.appUser$
      .pipe(
        map((user) => (user && user.addresses ? user.addresses : [])),
        take(1)
      )
      .subscribe((addresses) => (this.addresses = addresses));
  }

  showAddresses() {
    const addressesDialog = this.matDialog.open(AddressesComponent, {
      data: this.addresses,
      maxWidth: 650,
      width: '95%',
      panelClass: 'mat-dialog-box',
    });

    addressesDialog
      .afterClosed()
      .subscribe((data) => data && this.shippingForm.setValue(data));
  }

  // Form Getters

  get name() {
    return this.shippingForm.get('name');
  }

  get doorNo() {
    return this.shippingForm.get('doorNo');
  }

  get address() {
    return this.shippingForm.get('address');
  }

  get city() {
    return this.shippingForm.get('city');
  }
}
