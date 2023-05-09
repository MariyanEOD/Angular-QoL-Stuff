import { environment } from 'src/environments/environment';

export const endpoints = {
  base: environment.base_url,
  woocommerce: {
    base: environment.woocommerce_url,
    products: environment.woocommerce_url + '/products',
    productById: (id: number | string) =>
      environment.woocommerce_url + '/products/' + id,
    categories: environment.woocommerce_url + '/products/categories',
    tags: environment.woocommerce_url + '/products/tags',
    customers: environment.woocommerce_url + '/customers',
    orders: environment.woocommerce_url + '/orders',
    attributes: environment.woocommerce_url + '/products/attributes',
  },
  wordpress: {
    base: environment.wordpress_url,
    users: environment.wordpress_url + '/users',
    get_token: '/simple-jwt-login/v1/auth', // Used for login flow, to not be used outside of that context
    validate_token: '/simple-jwt-login/v1/auth/validate', // Used for login flow, to not be used outside of that context
    reset_password: '/simple-jwt-login/v1/user/reset_password',
    users_update: environment.base_url + 'wp/v2/users/',
  },
};
