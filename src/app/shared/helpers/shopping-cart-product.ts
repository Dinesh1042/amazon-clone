import { Product } from 'shared/models/product';

export function ShoppingCartProductFactory({
  title,
  originalPrice,
  offerPrice,
  images: productImages,
  category,
  rating,
  description,
}: Product): ShoppingCartProduct {
  const images = productImages as string[];

  return {
    title,
    originalPrice,
    offerPrice,
    images,
    category,
    rating,
    description,
  };
}

export interface ShoppingCartProduct {
  title: string;
  images: string[];
  originalPrice: number;
  offerPrice: number;
  category: string;
  description: string;
  rating: number;
}
