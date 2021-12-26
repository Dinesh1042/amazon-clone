import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Shipping } from 'shared/models/shipping';

@Component({
  selector: 'addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent {
  selectedAddressIndex = -1;

  constructor(@Inject(MAT_DIALOG_DATA) public addresses: Shipping[]) {}
}
