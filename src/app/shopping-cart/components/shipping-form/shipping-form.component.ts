import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
})
export class ShippingFormComponent implements OnInit {
  @Input('orderPlacedLoading') orderPlacedLoading = false;

  @Output('placeOrderEvent') placeOrderEvent = new EventEmitter();

  shippingForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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
