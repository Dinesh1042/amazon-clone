import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$?: Observable<Product[]>;
  loading = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.products$ = this.route.queryParamMap.pipe(
      switchMap((queryParam) => {
        const query = queryParam.get('query');
        return this.productService
          .getQueryProduct(query)
          .pipe(tap(() => (this.loading = false)));
      })
    );

    this.titleService.setTitle('Amazon');
  }
}
