import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from './endpoints';
import { BehaviorSubject, catchError, of, switchMap, tap } from 'rxjs';
import { WoocommerceService } from './woocommerce.service';
import { User, WordpressUser } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class WordpressService {
  private LOCAL_STORAGE_KEY = 'food-auth-token';
  private CART_STORAGE_KEY = 'food-cart-items';
  private user$ = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient, private woo: WoocommerceService) {}
  register(body: {
    email: string;
    password: string;
    username: string;
    phone: string;
  }) {
    return this.http.post<WordpressUser>(endpoints.wordpress.users, body);
  }
  /**
   * Login flow goes through multiple steps
   * 1. Get a JWT token using get_token()
   * 2. Save token in localStorage
   * 3. Validate the JWT token, returning user info but mostly the user's id using validate_token()
   * 4. Get WooCommerce Customer using the user's id from step 2 and save it using WooCommerce's getCustomerById
   */
  login(body: { username: string; password: string }) {
    // Get the token
    return this.get_token(body).pipe(
      // Save the token
      tap((response: any) =>
        localStorage.setItem(this.LOCAL_STORAGE_KEY, response.data.jwt)
      ),
      // Get user id through validating token
      switchMap((response: any) => this.validate_token(response.data.jwt)),
      // Get WooCommerce Customer about the user
      switchMap((response: any) =>
        this.woo.getCustomerById(response.data.user.ID)
      ),
      // Save the user
      tap((user: any) => this.user$.next(user))
    );
  }
  getUser() {
    return this.user$.asObservable();
  }
  setUser(data: User) {
    this.user$.next(data);
  }
  logout() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);
    this.user$.next(null);
  }
  resetPassword(email: string) {
    return this.http.post(
      endpoints.base,
      {},
      {
        params: {
          rest_route: endpoints.wordpress.reset_password,
          email,
        },
      }
    );
  }
  autologin() {
    const token = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (token) {
      return this.validate_token(token).pipe(
        switchMap((response: any) =>
          this.woo.getCustomerById(response.data.user.ID)
        ),

        tap((user: any) => this.user$.next(user))
      );
    }
    //
    // TODO: Enable that
    localStorage.removeItem('food-cart-items');
    return of(null);
  }
  updateUserPassword(userId: string, password: string) {
    return this.http.post(
      endpoints.wordpress.users_update + userId,
      {},
      {
        params: {
          password,
        },
      }
    );
  }
  private get_token(body: { username: string; password: string }) {
    return this.http.post(endpoints.base, body, {
      params: {
        rest_route: endpoints.wordpress.get_token,
      },
    });
  }
  private validate_token(token: string) {
    return this.http.get(endpoints.base, {
      params: {
        rest_route: endpoints.wordpress.validate_token,
        JWT: token,
      },
    });
  }
}
