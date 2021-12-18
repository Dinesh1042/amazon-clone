import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  constructor() {}

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
  };
}
