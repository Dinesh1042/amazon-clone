import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
})
export class ProductCarouselComponent {
  @Input('images') images: any[] = [];
  @Input('title') title: string = '';

  constructor() {}

  mainImageIndex = 0;
  isImageAnimationEnded = true;

  next() {
    if (this.isImageAnimationEnded) this.mainImageIndex = this.nextImgIndex;
  }

  prev() {
    if (this.isImageAnimationEnded) this.mainImageIndex = this.prevImgIndex;
  }

  get nextImgIndex() {
    return this.mainImageIndex < this.images.length - 1
      ? 1 + this.mainImageIndex
      : 0;
  }

  get prevImgIndex() {
    return this.mainImageIndex <= 0
      ? this.images.length - 1
      : this.mainImageIndex - 1;
  }
}
