import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from './endpoints';
import {
  Attribute,
  AttributeTerm,
  AttributeTermList,
  ProductAttribute,
  WooCategories,
  WooCategory,
  WooCategoryQueryParams,
  WooProduct,
  WooProductQueryParams,
  WooProducts,
  WooTag,
  WooTagQueryParams,
} from '../interfaces/woocommerce.interface';
import { User } from '../interfaces/user.interface';
import { Order } from '../interfaces/order.interface';
import {
  BehaviorSubject,
  map,
  tap,
  expand,
  scan,
  last,
  Observable,
  EMPTY,
} from 'rxjs';
import { getPaginationHeader } from './utils/rxjs-utils';

@Injectable({ providedIn: 'root' })
export class WoocommerceService {
  constructor(private http: HttpClient) {
    const favorites = localStorage.getItem(this.key);

    if (favorites) {
      this.favorites = JSON.parse(favorites) as string[];
      this.favorites$.next(this.favorites);
    }
  }
  private key = 'food-cart-favorites';
  private favorites: string[] = [];

  favorites$ = new BehaviorSubject<string[]>(this.favorites);

  /**
   * Methods regarding Woocommerce's Products and Categories------------------------------------
   */

  getProducts(query?: WooProductQueryParams) {
    return this.http
      .get<WooProduct[]>(endpoints.woocommerce.products, {
        params: {
          ...query,
        },
      })
      .pipe(map((products) => this.is_favorite_predicate_array(products)));
  }
  getProductById(productId: number | string) {
    return this.http
      .get<WooProduct>(endpoints.woocommerce.productById(productId))
      .pipe(map((product) => this.is_favorite_predicate_object(product)));
  }
  getProductsByCategory(
    category: number | string,
    query?: WooProductQueryParams
  ) {
    return this.http
      .get<WooProducts>(endpoints.woocommerce.products, {
        params: {
          category,
          ...query,
        },
        observe: 'response',
      })
      .pipe(map((response) => getPaginationHeader(response)));
    //  map((response) => this.is_favorite_predicate_array(response)));
  }
  getProductsByCategoryPaginated(
    category: number | string,
    query?: WooProductQueryParams
  ) {
    let page = 1;
    query = {
      ...query,
      page,
    };
    const getNextPageData = () => {
      page++;
      query = {
        ...query,
        page,
      };
      return this.getProductsByCategory(category, {
        ...query,
      });
    };
    return this.getProductsByCategory(category, query).pipe(
      expand((response) => {
        if (page < response.totalPages) {
          return getNextPageData();
        }
        return EMPTY;
      }),
      scan(
        (acc, curr) => {
          return {
            ...acc,
            ...curr,
            data: [...acc.data, ...curr.data],
          };
        },
        {
          pageSize: 0,
          totalPages: 0,
          data: [] as WooProduct[],
        }
      ),
      last(),
      map((response) => ({
        ...response,
        data: this.is_favorite_predicate_array(response.data),
      }))
      // map((products) => this.is_favorite_predicate_array(products))
    );
  }
  getCategories(query?: WooCategoryQueryParams) {
    return this.http
      .get<WooCategories>(endpoints.woocommerce.categories, {
        params: {
          ...query,
        },
        observe: 'response',
      })
      .pipe(map((response) => getPaginationHeader(response)));
  }
  getCategory(categoryId: number | string) {
    return this.http.get<WooCategory>(
      endpoints.woocommerce.categories + '/' + categoryId
    );
  }
  getCategoriesPaginated(query?: WooCategoryQueryParams) {
    let page = 1;
    query = {
      ...query,
      page,
    };
    const getNextPageData = () => {
      page++;
      query = {
        ...query,
        page,
      };
      return this.getCategories({ ...query });
    };
    return this.getCategories({ ...query }).pipe(
      expand((response) => {
        if (page < response.totalPages) {
          return getNextPageData();
        }
        return EMPTY;
      }),
      scan(
        (acc, curr) => {
          return {
            ...acc,
            ...curr,
            data: [...acc.data, ...curr.data],
          };
        },
        {
          pageSize: 0,
          totalPages: 0,
          data: [] as WooCategory[],
        }
      ),
      last()
    );
  }
  getTag(query?: WooTagQueryParams) {
    return this.http.get<WooTag[]>(endpoints.woocommerce.tags, {
      params: {
        ...query,
      },
    });
  }

  /**
   * Methods regarding Woocommerce's Customer----------------------------------------------------
   */

  getCustomerById(customerId: string | number) {
    return this.http.get(endpoints.woocommerce.customers + `/${customerId}`);
  }
  updateCustomerById(customerId: string | number, data: any) {
    return this.http.post<User>(
      endpoints.woocommerce.customers + `/${customerId}`,
      data
    );
  }

  /**
   * Methods regarding Woocommerce's Orders -----------------------------------------------------
   */

  getOrders(customerId: string | number, query?: WooProductQueryParams) {
    return this.http
      .get<Order[]>(endpoints.woocommerce.orders, {
        params: {
          ...query,
          customer: customerId,
        },
        observe: 'response',
      })
      .pipe(map((response) => getPaginationHeader(response)));
  }
  getOrdersPaginated(
    customerId: string | number,
    query?: WooProductQueryParams
  ) {
    let page = 1;
    query = {
      ...query,
      page,
    };
    const getNextPageData = () => {
      page++;
      query = {
        ...query,
        page,
      };
      return this.getOrders(customerId, query);
    };
    return this.getOrders(customerId, query).pipe(
      expand((response) => {
        if (page < response.totalPages) {
          return getNextPageData();
        }
        return EMPTY;
      }),
      scan(
        (acc, curr: AttributeTermList) => {
          //  console.log('Acc: ', acc, 'Curr: ', curr);
          return {
            ...acc,
            ...curr,
            data: [...acc.data, ...curr.data],
          };
        },
        {
          pageSize: 0,
          totalPages: 0,
          data: [] as Order[],
        }
      ),
      last(),
      map((v) => v.data)
    );
  }
  getOrder(orderId: string) {
    return this.http.get<Order>(endpoints.woocommerce.orders + `/${orderId}`);
  }
  createOrder(body: Order) {
    return this.http.post<Order>(endpoints.woocommerce.orders, body);
  }
  updateOrder(orderId: string | number, body: Order) {
    return this.http.post<Order>(
      endpoints.woocommerce.orders + `/${orderId}`,
      body
    );
  }
  deleteOrder(orderId: string | number) {
    return this.http.delete(endpoints.woocommerce.orders + `/${orderId}`, {
      params: {
        force: true,
      },
    });
  }

  /**
   * Methods regarding Woocommerce's Attributes and Product Attributes ---------------------------
   */

  getAttributes(page = 1) {
    return this.http.get<Attribute[]>(endpoints.woocommerce.attributes, {
      params: {
        page,
      },
    });
  }
  getAttribute(attributeId: string | number) {
    return this.http.get<Attribute>(
      endpoints.woocommerce.attributes + `/${attributeId}`
    );
  }
  getAttributeTerms(
    page = 1,
    attributeId: string | number
  ): Observable<AttributeTermList> {
    return this.http
      .get<AttributeTermList>(
        `${endpoints.woocommerce.attributes}/${attributeId}/terms`,
        {
          params: {
            page,
          },
          observe: 'response',
        }
      )
      .pipe(map((response) => getPaginationHeader(response)));
  }
  getAttributeTermsPaginated(page = 1, attributeId: string | number) {
    const getNextPageData = () => {
      page++;
      return this.getAttributeTerms(page, attributeId);
    };
    return this.getAttributeTerms(page, attributeId).pipe(
      expand((response) => {
        if (page < response.totalPages) {
          return getNextPageData();
        }
        return EMPTY;
      }),
      scan(
        (acc, curr: AttributeTermList) => {
          //  console.log('Acc: ', acc, 'Curr: ', curr);
          return {
            ...acc,
            ...curr,
            data: [...acc.data, ...curr.data],
          };
        },
        {
          pageSize: 0,
          totalPages: 0,
          data: [] as AttributeTerm[],
        }
      ),
      last(),
      map((v) => v.data)
    );
  }
  /**
   * Methods regarding Local Favorite product ----------------------------------------------------
   */
  toggleFavorite(productId: string) {
    const productIndex = this.favorites.indexOf(productId);

    if (productIndex !== -1) {
      // Remove product from favorites
      this.favorites.splice(productIndex, 1);
    } else {
      // Add product to favorites
      this.favorites.push(productId);
    }
    localStorage.setItem(this.key, JSON.stringify(this.favorites));
    this.favorites$.next(this.favorites);
  }
  private is_favorite_predicate_array(data: WooProduct[]) {
    return data.map((p) => this.is_favorite_predicate_object(p));
  }
  private is_favorite_predicate_object(data: WooProduct) {
    return {
      ...data,
      is_favorite: !!this.favorites.find(
        (fId) => fId.toString() === data.id.toString()
      ),
    };
  }
}
