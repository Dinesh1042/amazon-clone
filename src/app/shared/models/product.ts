export class Product {
  productID?: string;
  title: string = '';
  category: string = '';
  originalPrice: number = 0;
  offerPrice: number = 0;
  rating: number = 0;
  images: Array<File | string> = [];
  description: string = '';

  constructor(product: any) {
    //TODO: Create a productInterface
    Object.assign(this, product);
  }

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
