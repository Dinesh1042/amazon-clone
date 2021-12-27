import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  alertData = {
    title: `Delete Product`,
    body: ` Do you want to delete this product?`,
    confirmButton: `Delete`,
    cancelButton: `Cancel`,
  };

  constructor(@Inject(MAT_DIALOG_DATA) private data: AlertData) {}

  ngOnInit(): void {
    this.alertData = this.data;
  }
}

interface AlertData {
  title: string;
  body: string;
  confirmButton: string;
  cancelButton: string;
}
