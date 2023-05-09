export interface Product {
  id: number;
  name: string;
  category: string;
  price?: number;
  offer?: number;
  stock?: number;
  image: string;
  rating: number;
}
