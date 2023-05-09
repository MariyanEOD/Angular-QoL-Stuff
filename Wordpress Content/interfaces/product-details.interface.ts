import { WooProduct } from './woocommerce.interface';

export interface ProductDetails {
  colors: string[];
  sizes: string[];
  products: WooProduct[];
  selected?: WooProduct;
}
