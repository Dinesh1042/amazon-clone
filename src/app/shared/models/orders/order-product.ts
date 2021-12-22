export class OrderProduct {
  title: string;
  originalPrice: number;
  offerPrice: number;
  image: string;

  constructor(
    product: OrderProductInterface,
    public quantity: number,
    public pid: string
  ) {
    this.title = product.title;
    this.originalPrice = product.originalPrice;
    this.offerPrice = product.offerPrice;
    this.image = product.image;
  }

  get price() {
    return this.offerPrice !== null && this.offerPrice < this.originalPrice
      ? this.offerPrice
      : this.originalPrice;
  }

  get itemTotalPrice() {
    return this.price * this.quantity;
  }
}

export interface OrderProductsInterface {
  [productId: string]: {
    product: OrderProductInterface;
    quantity: number;
  };
}

export interface OrderProductInterface {
  title: string;
  offerPrice: number;
  originalPrice: number;
  image: string;
}
