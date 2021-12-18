import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { SwiperModule } from 'swiper/angular';

import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeProductCardComponent } from './components/home-product-card/home-product-card.component';
import { HomeProductLoaderComponent } from './components/home-product-loader/home-product-loader.component';
import { HomeProductsComponent } from './components/home-products/home-products.component';
import { HomeComponent } from './components/home/home.component';
import { PopularCategoriesComponent } from './components/popular-categories/popular-categories.component';

@NgModule({
  declarations: [
    CarouselComponent,
    HomeComponent,
    PopularCategoriesComponent,
    HomeProductsComponent,
    HomeProductCardComponent,
    HomeProductLoaderComponent,
  ],
  imports: [
    CommonModule,
    SwiperModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
})
export class HomeModule {}
