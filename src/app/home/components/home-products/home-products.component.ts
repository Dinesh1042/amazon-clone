import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'shared/models/product';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss'],
})
export class HomeProductsComponent {
  @Input('products') products$!: Observable<Product[]>;

  productLoaderSlides = Array(5);

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      980: {
        slidesPerView: 4,
      },
      1400: {
        slidesPerView: 5,
      },
    },
  };
}
