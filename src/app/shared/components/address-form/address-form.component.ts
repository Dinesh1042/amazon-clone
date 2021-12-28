import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Shipping } from 'shared/models/shipping';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
})
export class AddressFormComponent implements OnInit {
  @Input('confirmBtnLoading') confirmBtnLoading = false;
  @Input('confirmBtnLabel') confirmBtnLabel = 'Confirm';

  @Input('addressFormValue') set addressFormValue(value: Shipping) {
    value && this.addressForm.setValue(value);
  }

  @Output('submitEvent') submitEvent = new EventEmitter();

  addressForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  submitForm() {
    this.addressForm.valid && this.submitEvent.emit(this.addressForm.value);
  }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      doorNo: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
    });
  }

  // Form Getters

  get name() {
    return this.addressForm.get('name');
  }

  get doorNo() {
    return this.addressForm.get('doorNo');
  }

  get address() {
    return this.addressForm.get('address');
  }

  get city() {
    return this.addressForm.get('city');
  }
}
