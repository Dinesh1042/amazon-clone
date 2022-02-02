import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dealOfDayTheProducts$!: Observable<Product[]>;
  fiftyPercentOffProducts$!: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.dealOfDayTheProducts$ = this.productService.getDealOfTheProducts();
    this.fiftyPercentOffProducts$ =
      this.productService.getFiftyPercentOffProducts();

    this.titleService.setTitle('Home - Amazon');
  }
}
