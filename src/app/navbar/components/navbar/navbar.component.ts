import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  shoppingCart$?: Observable<ShoppingCart>;
  cartLoading = false;

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.cartLoading = true;
    this.shoppingCart$ = this.cartService.getCart().pipe(
      tap(
        () => (this.cartLoading = false),
        () => (this.cartLoading = false)
      )
    );
  }
}
