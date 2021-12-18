import { Product } from './product';
import { ShoppingCartItem, ShoppingCartItemModel } from './shopping-cart-item';

export class ShoppingCart {
  shoppingCartItems: ShoppingCartItem[] = [];

  constructor(public shoppingCartMap: ShoppingCartModel) {
    this.initializeCart();
  }

  get cartTotalPrice() {
    return this.shoppingCartItems.reduce(
      (acc, val) => acc + val.cartItemTotalPrice,
      0
    );
  }

  get cartProductCount() {
    return this.shoppingCartItems.reduce((acc, val) => acc + val.quantity, 0);
  }

  getQuantity(product: Product) {
    if (product.pid) {
      const cartProduct = this.shoppingCartMap[product.pid];
      return cartProduct?.quantity || 0;
    } else return 0;
  }

  private initializeCart() {
    for (const pid in this.shoppingCartMap)
      this.shoppingCartItems.push(
        new ShoppingCartItem(this.shoppingCartMap[pid], pid)
      );

    this.shoppingCartItems = this.shoppingCartItems.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }
}

export interface ShoppingCartModel {
  [pid: string]: ShoppingCartItemModel;
}
