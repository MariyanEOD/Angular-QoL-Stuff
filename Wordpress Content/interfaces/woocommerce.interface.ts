import { HeaderResponse } from './header-response.interace';

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Image {
  id: number;
  date_created: Date;
  date_created_gmt: Date;
  date_modified: Date;
  date_modified_gmt: Date;
  src: string;
  name: string;
  alt: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  option: string;
  options: string[];
}

export interface Self {
  href: string;
}

export interface Collection {
  href: string;
}

export interface Links {
  self: Self[];
  collection: Collection[];
}
export interface Dimensions {
  length: string;
  width: string;
  height: string;
}

export interface WooCategories extends HeaderResponse {
  data: WooCategory[];
}
export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  /**
   * USED ONLY WHEN CREATING/UPDATING ORDER
   */
  product_id?: string;
  display: string;
  image?: {
    id: number;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    src: string;
    name: string;
    alt: string;
  };
  menu_order: number;
  count: number;
  _links: {
    self: {
      href: string;
    }[];
    collection: {
      href: string;
    }[];
  };
}

export interface WooProduct {
  /**
   * This property is added manually for checking if the product is favorited by the user.
   * Currently only in Home page
   */
  is_favorite?: boolean;
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: Date;
  date_created_gmt: Date;
  date_modified: Date;
  date_modified_gmt: Date;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: number;
  regular_price: string;
  sale_price: number;
  date_on_sale_from?: any;
  date_on_sale_from_gmt?: any;
  date_on_sale_to?: any;
  date_on_sale_to_gmt?: any;
  price_html: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: any[];
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity?: any;
  stock_status: string;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  sold_individually: boolean;
  weight: string;
  dimensions: Dimensions;
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  upsell_ids: any[];
  cross_sell_ids: any[];
  parent_id: number;
  purchase_note: string;
  categories: Category[];
  tags: any[];
  images: Image[];
  attributes: ProductAttribute[];
  default_attributes: any[];
  variations: any[];
  grouped_products: any[];
  menu_order: number;
  meta_data: any[];
  _links: Links;
}

export interface WooProducts extends HeaderResponse {
  data: WooProduct[];
}
export interface Attribute {
  id: number;
  name: string;
  slug: string;
  type: string;
  order_by: string;
  has_archives: boolean;
}
export interface AttributeList extends HeaderResponse {
  data: Attribute[];
}

export interface AttributeTerm {
  id: number;
  name: string;
  slug: string;
  description: string;
  menu_order: number;
  count: number;
  _links: Links;
}
export interface AttributeTermList extends HeaderResponse {
  data: AttributeTerm[];
}
/**
 * Represents a set of parameters for querying products in a collection.
 */
export interface WooProductQueryParams {
  /**
   * Scope under which the request is made; determines fields present in response. Options: view and edit. Default is view.
   */
  context?: string;
  /**
   * Current page of the collection. Default is 1.
   */
  page?: number;
  /**
   * Maximum number of items to be returned in result set. Default is 10.
   */
  per_page?: number;
  /**
   * Limit results to those matching a string.
   */
  search?: string;
  /**
   * Limit response to resources published after a given ISO8601 compliant date.
   */
  after?: string;
  /**
   * Limit response to resources published before a given ISO8601 compliant date.
   */
  before?: string;
  /**
   * Limit response to resources modified after a given ISO8601 compliant date.
   */
  modified_after?: string;
  /**
   * Limit response to resources modified after a given ISO8601 compliant date.
   */
  modified_before?: string;
  /**
   * Whether to consider GMT post dates when limiting response by published or modified date.
   */
  dates_are_gmt?: boolean;
  /**
   * Ensure result set excludes specific IDs.
   */
  exclude?: number[];
  /**
   * Limit result set to specific ids.
   */
  include?: number[];
  /**
   * Offset the result set by a specific number of items.
   */
  offset?: number;
  /**
   * Order sort attribute ascending or descending. Options: asc and desc. Default is desc.
   */
  order?: string;
  /**
   * Sort collection by object attribute. Options: date, id, include, title, slug, price, popularity and rating. Default is date.
   */
  orderby?: string;
  /**
   * Limit result set to those of particular parent IDs.
   */
  parent?: number[];
  /**
   * Limit result set to all items except those of a particular parent ID.
   */
  parent_exclude?: number[];
  /**
   * Limit result set to products with a specific slug.
   */
  slug?: string;
  /**
   * Limit result set to products assigned a specific status. Options: any, draft, pending, private and publish. Default is any.
   */
  status?: string;
  /**
   * Limit result set to products assigned a specific type. Options: simple, grouped, external and variable.
   */
  type?: string;
  /**
   * Limit result set to products with a specific SKU.
   */
  sku?: string;
  /**
   * Limit result set to featured products.
   */
  featured?: boolean;
  /**
   * Limit result set to products assigned a specific category ID.
   */
  category?: string;
  /**
   * Limit result set to products assigned a specific tag ID.
   */
  tag?: string;
  /**
   * Limit result set to products assigned a specific shipping class ID.
   */
  shipping_class?: string;
  /**
   * Limit result set to products with a specific attribute.
   */
  attribute?: string;
  /**
   * Limit result set to products with a specific attribute term ID (required an assigned attribute).
   */
  attribute_term?: string;
  /**
   * Limit result set to products with a specific tax class. Default options: standard, reduced-rate and zero-rate.
   */
  tax_class?: string;
  /**
   * Limit result set to products on sale.
   */
  on_sale?: boolean;
  /**
   * Limit result set to products based on a minimum price.
   */
  min_price?: string;
  max_price?: string;
  stock_status?: string;
}

export interface WooCategoryQueryParams {
  /*
Scope under which the request is made; determines fields present in response.
Options: view and edit. Default is view.
*/
  context?: 'view' | 'edit';
  /**

Current page of the collection. Default is 1.
*/
  page?: number;
  /**

Maximum number of items to be returned in result set. Default is 10.
*/
  per_page?: number;
  /**

Limit results to those matching a string.
*/
  search?: string;
  /**

Ensure result set excludes specific ids.
*/
  exclude?: number[];
  /**

Limit result set to specific ids.
*/
  include?: number[];
  /**

Order sort attribute ascending or descending.
Options: asc and desc. Default is asc.
*/
  order?: 'asc' | 'desc';
  /**

Sort collection by resource attribute.
Options: id, include, name, slug, term_group, description and count. Default is name.
*/
  orderby?:
    | 'id'
    | 'include'
    | 'name'
    | 'slug'
    | 'term_group'
    | 'description'
    | 'count';
  /**

Whether to hide resources not assigned to any products. Default is false.
*/
  hide_empty?: boolean;
  /**

Limit result set to resources assigned to a specific parent.
*/
  parent?: number;
  /**

Limit result set to resources assigned to a specific product.
*/
  product?: number;
  /**

Limit result set to resources with a specific slug.
*/
  slug?: string;
}

export interface WooTagQueryParams {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  count?: number;
}
export interface WooTag {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  _links: Links;
}
export interface Links {
  self: Collection[];
  collection: Collection[];
}

export interface Collection {
  href: string;
}
/**
 * Query parameters for retrieving a collection of resources.
 */
export interface WooOrderQueryParams {
  /**
   * Scope under which the request is made; determines fields present in response.
   * @default 'view'
   */
  context?: 'view' | 'edit';
  /**
   * Current page of the collection.
   * @default 1
   */
  page?: number;
  /**
   * Maximum number of items to be returned in result set.
   * @default 10
   */
  per_page?: number;
  /**
   * Limit results to those matching a string.
   */
  search?: string;
  /**
   * Limit response to resources published after a given ISO8601 compliant date.
   */
  after?: string;
  /**
   * Limit response to resources published before a given ISO8601 compliant date.
   */
  before?: string;
  /**
   * Limit response to resources modified after a given ISO8601 compliant date.
   */
  modified_after?: string;
  /**
   * Limit response to resources modified after a given ISO8601 compliant date.
   */
  modified_before?: string;
  /**
   * Whether to consider GMT post dates when limiting response by published or modified date.
   */
  dates_are_gmt?: boolean;
  /**
   * Ensure result set excludes specific IDs.
   */
  exclude?: number[];
  /**
   * Limit result set to specific IDs.
   */
  include?: number[];
  /**
   * Offset the result set by a specific number of items.
   */
  offset?: number;
  /**
   * Order sort attribute ascending or descending.
   * @default 'desc'
   */
  order?: 'asc' | 'desc';
  /**
   * Sort collection by object attribute.
   * @default 'date'
   */
  orderby?: 'date' | 'id' | 'include' | 'title' | 'slug';
  /**
   * Limit result set to those of particular parent IDs.
   */
  parent?: number[];
  /**
   * Limit result set to all items except those of a particular parent ID.
   */
  parent_exclude?: number[];
  /**
   * Limit result set to orders assigned a specific status.
   * @default 'any'
   */
  status?:
    | 'any'
    | 'pending'
    | 'processing'
    | 'on-hold'
    | 'completed'
    | 'cancelled'
    | 'refunded'
    | 'failed'
    | 'trash';
  /**
   * Limit result set to orders assigned a specific customer.
   */
  customer?: number;
  /**
   * Limit result set to orders assigned a specific product.
   */
  product?: number;
  /**
   * Number of decimal points to use in each resource.
   * @default 2
   */
  dp?: number;
}
