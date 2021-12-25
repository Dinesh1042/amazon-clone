import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

import { AddCartBtnComponent } from './components/add-cart-btn/add-cart-btn.component';
import { AlertComponent } from './components/alert/alert.component';
import { DropzoneComponent } from './components/dropzone/dropzone.component';
import { ErrorComponent } from './components/error/error.component';
import { LoaderComponent } from './components/loader/loader.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ProductCarouselComponent } from './components/product-carousel/product-carousel.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { AlertDirective } from './directives/alert.directive';
import { ButtonLoaderDirective } from './directives/button-loader.directive';
import { DropzoneDirective } from './directives/dropzone.directive';
import { CamelCaseSplitPipe } from './pipes/camel-case-split.pipe';
import { FileToDataUrlPipe } from './pipes/file-to-data-url.pipe';
import { ShortPipe } from './pipes/short.pipe';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

@NgModule({
  declarations: [
    AddCartBtnComponent,
    AlertComponent,
    AlertDirective,
    ButtonLoaderDirective,
    CamelCaseSplitPipe,
    DropzoneComponent,
    DropzoneDirective,
    ErrorComponent,
    FileToDataUrlPipe,
    LoaderComponent,
    OrderSummaryComponent,
    ProductCarouselComponent,
    ProductDetailComponent,
    ShortPipe,
    StarRatingComponent,
    OrderDetailComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule.forChild([]),
    SwiperModule,
  ],
  exports: [
    AddCartBtnComponent,
    AlertComponent,
    AlertDirective,
    ButtonLoaderDirective,
    CamelCaseSplitPipe,
    DropzoneComponent,
    DropzoneDirective,
    ErrorComponent,
    FileToDataUrlPipe,
    LoaderComponent,
    MatDialogModule,
    MatSnackBarModule,
    OrderSummaryComponent,
    ProductDetailComponent,
    ShortPipe,
    StarRatingComponent,
    OrderDetailComponent,
  ],
  providers: [{ provide: 'amazonCartId', useValue: 'amazonCartId' }],
})
export class SharedModule {}
