import { Product } from './product';
import { ShoppingCartItem, ShoppingCartItemModel } from './shopping-cart-item';

export class ShoppingCart {
  shoppingCartItems: ShoppingCartItem[] = [];

  constructor(public shoppingCartMap: ShoppingCartModel) {
    this.initializeCart();
  }

  get cartTotalPrice() {
    return this.shoppingCartItems.reduce(
      (acc, val) => acc + val.itemTotalPrice,
      0
    );
  }

  get cartProductCount() {
    return this.shoppingCartItems.reduce((acc, val) => acc + val.quantity, 0);
  }

  getQuantity(product: Product) {
    if (product.productID) {
      const cartProduct = this.shoppingCartMap[product.productID];
      return cartProduct?.quantity || 0;
    } else return 0;
  }

  private initializeCart() {
    for (const productID in this.shoppingCartMap)
      this.shoppingCartItems.push(
        new ShoppingCartItem(this.shoppingCartMap[productID], productID)
      );

    this.shoppingCartItems = this.shoppingCartItems.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }
}

export interface ShoppingCartModel {
  [productID: string]: ShoppingCartItemModel;
}
