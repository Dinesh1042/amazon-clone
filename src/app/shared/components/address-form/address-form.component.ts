import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Shipping } from 'shared/models/shipping';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
})
export class AddressFormComponent implements OnInit, OnChanges {
  @Input('confirmBtnLoading') confirmBtnLoading = false;
  @Input('confirmBtnLabel') confirmBtnLabel = 'Confirm';
  @Input('addressFormValue') addressFormValue = {} as Shipping;

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
    this.addressForm.patchValue(this.addressFormValue);
  }

  ngOnChanges(changes: SimpleChanges): void {
    changes.addressFormValue &&
      this.addressForm?.patchValue(changes.addressFormValue.currentValue);

    changes.confirmBtnLoading && changes.confirmBtnLoading.currentValue
      ? this.addressForm?.disable()
      : this.addressForm?.enable();
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
