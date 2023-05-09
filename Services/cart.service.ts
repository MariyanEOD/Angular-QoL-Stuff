import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WooProduct } from '../interfaces/woocommerce.interface';
export interface CartItem {
  quantity: number;
  product: WooProduct;
}
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items$ = new BehaviorSubject<CartItem[]>([]);
  private LOCAL_STORAGE_KEY = 'food-cart-items';
  constructor() {
    const items = this.getCartFromCache();
    this.items$.next(items);
  }

  getCart() {
    return this.items$.asObservable();
  }

  addItem(item: CartItem): void {
    const currentItems = this.items$.value;
    const existingItemIndex = currentItems.findIndex(
      (i) => i.product.id === item.product.id
    );

    if (existingItemIndex > -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + item.quantity,
      };
      this.items$.next(updatedItems);
    } else {
      this.items$.next([...currentItems, item]);
    }
    this.saveCartInCache();
  }

  updateItem(item: CartItem): void {
    const currentItems = this.items$.value;
    const existingItemIndex = currentItems.findIndex(
      (i) => i.product.id === item.product.id
    );

    if (existingItemIndex > -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: item.quantity,
      };
      this.items$.next(updatedItems);
    }
    this.saveCartInCache();
  }

  removeItem(item: CartItem): void {
    const currentItems = this.items$.value;
    const itemIndex = currentItems.findIndex(
      (i) => i.product.id === item.product.id
    );

    if (itemIndex > -1) {
      const updatedItems = [...currentItems];
      updatedItems.splice(itemIndex, 1);
      this.items$.next(updatedItems);
    }
    this.saveCartInCache();
  }

  clearCart(): void {
    this.items$.next([]);
    this.saveCartInCache();
  }
  saveCartInCache() {
    localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify(this.items$.value)
    );
  }
  getCartFromCache() {
    return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY) || '[]');
  }
  getTotal(): number {
    return this.items$.value.reduce(
      (total, item) => total + Number(item.product.price) * item.quantity,
      0
    );
  }
  /**
   * @returns Returns data with filled Size/Color fields. If no size/color, it is null/undefined
   */
  getTransformedData() {
    throw new Error('Configure this method.');
    return this.items$.value.map((p) => ({
      ...p,
      product: {
        ...p.product,
        size: p.product.attributes.find((a) => a.name === 'Size'),
        color: p.product.attributes.find((a) => a.name === 'Color'),
      },
    }));
  }
}
