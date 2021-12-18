import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'shared/models/product';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  @Input('product') product = {} as Product;

  constructor() {}

  ngOnInit(): void {}
}
