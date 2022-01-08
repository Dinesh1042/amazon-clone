import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
})
export class ProductCarouselComponent implements AfterViewInit, OnDestroy {
  @Input('images') images: any[] = [];
  @Input('title') title: string = '';

  @ViewChild(SwiperComponent) swiperEl!: SwiperComponent;

  currentImageIndex = 0;

  private subscriptions = new Subscription();

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.subscriptions.add(
      this.swiperEl.indexChange
        .asObservable()
        .subscribe(this.handleIndexChange.bind(this))
    );
  }

  slideImage(index: number) {
    this.swiperEl.swiperRef.slideTo(index, 400);
  }

  handleIndexChange(index: number) {
    this.currentImageIndex = index;
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
