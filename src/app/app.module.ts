import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'shared/shared.module';

import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterModule } from './footer/footer.module';
import { HomeModule } from './home/home.module';
import { NavbarModule } from './navbar/navbar.module';
import { ProductModule } from './product/product.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AdminModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FooterModule,
    HomeModule,
    NavbarModule,
    ProductModule,
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    SharedModule,
    ShoppingCartModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
