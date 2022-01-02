import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

import { AddCartBtnComponent } from './components/add-cart-btn/add-cart-btn.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { AlertComponent } from './components/alert/alert.component';
import { DropzoneComponent } from './components/dropzone/dropzone.component';
import { ErrorComponent } from './components/error/error.component';
import { LoaderComponent } from './components/loader/loader.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
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

@NgModule({
  declarations: [
    AddCartBtnComponent,
    AddressFormComponent,
    AlertComponent,
    AlertDirective,
    ButtonLoaderDirective,
    CamelCaseSplitPipe,
    DropzoneComponent,
    DropzoneDirective,
    ErrorComponent,
    FileToDataUrlPipe,
    LoaderComponent,
    OrderDetailComponent,
    OrderSummaryComponent,
    ProductCarouselComponent,
    ProductDetailComponent,
    ShortPipe,
    StarRatingComponent,
    OrderCardComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule.forChild([]),
    SwiperModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddCartBtnComponent,
    AddressFormComponent,
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
    OrderDetailComponent,
    OrderSummaryComponent,
    ProductDetailComponent,
    ShortPipe,
    StarRatingComponent,
    OrderCardComponent,
  ],
  providers: [{ provide: 'amazonCartId', useValue: 'amazonCartId' }],
})
export class SharedModule {}
