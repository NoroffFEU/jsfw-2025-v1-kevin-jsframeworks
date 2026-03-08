import type { ProductImage } from "./product";

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  discountedPrice: number;
  image: string;
  alt: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface AddToCartPayload {
  productId: string;
  title: string;
  price: number;
  discountedPrice: number;
  image: ProductImage;
}