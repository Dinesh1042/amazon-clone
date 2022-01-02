import { ShoppingCartProduct } from 'shared/helpers/shopping-cart-product';

export class ShoppingCartItem {
  title: string;
  images: string[];
  originalPrice: number;
  offerPrice: number;
  category: string;
  description: string;
  rating: number;
  quantity: number;
  image: string;

  constructor(
    { product, quantity }: ShoppingCartItemModel,
    public productID: string
  ) {
    this.title = product.title;
    this.images = product.images;
    this.originalPrice = product.originalPrice;
    this.offerPrice = product.offerPrice;
    this.category = product.category;
    this.description = product.description;
    this.rating = product.rating;
    this.quantity = quantity;
    this.image = product.images[0];
  }

  get itemTotalPrice() {
    return this.quantity * this.price;
  }

  //TODO: Extend this to class

  get priceDifference() {
    return this.originalPrice - this.offerPrice;
  }

  get offerPercentage() {
    const offPer = +Math.abs(
      (this.offerPrice / this.originalPrice) * 100 - 100
    ).toFixed(2);
    return offPer < 1 && offPer > 0 ? offPer : Math.round(offPer);
  }

  get price() {
    return this.offerPrice !== null && this.offerPrice < this.originalPrice
      ? this.offerPrice
      : this.originalPrice;
  }

  get isOfferProduct() {
    return this.offerPrice !== null && this.originalPrice - this.offerPrice > 0;
  }
}

export interface ShoppingCartItemModel {
  product: ShoppingCartProduct;
  quantity: number;
}
