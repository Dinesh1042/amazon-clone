export class OrderProduct {
  title: string;
  originalPrice: number;
  offerPrice: number;
  image: string;
  quantity = 0;
  productID: string;

  constructor(product: OrderProductInterface) {
    const {
      quantity,
      productID,
      product: { title, image, originalPrice, offerPrice },
    } = product;

    this.title = title;
    this.originalPrice = originalPrice;
    this.offerPrice = offerPrice;
    this.image = image;
    this.quantity = quantity;
    this.productID = productID;
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

export interface OrderProductInterface {
  productID: string;
  quantity: number;
  product: {
    title: string;
    offerPrice: number;
    originalPrice: number;
    image: string;
  };
}
