// Generated by https://quicktype.io

export interface Order {
  id?: number;
  parent_id?: number;
  status?: string;
  currency?: string;
  version?: string;
  prices_include_tax?: boolean;
  date_created?: string;
  date_modified?: string;
  discount_total?: string;
  discount_tax?: string;
  shipping_total?: string;
  shipping_tax?: string;
  cart_tax?: string;
  total?: string;
  total_tax?: string;
  customer_id?: number;
  order_key?: string;
  billing?: Ing;
  shipping?: Ing;
  payment_method?: string;
  payment_method_title?: string;
  transaction_id?: string;
  customer_ip_address?: string;
  customer_user_agent?: string;
  created_via?: string;
  customer_note?: string;
  date_completed?: null;
  date_paid?: null;
  cart_hash?: string;
  number?: string;
  meta_data?: any[];
  line_items?: OrderLineItem[];
  tax_lines?: any[];
  shipping_lines?: any[];
  fee_lines?: any[];
  coupon_lines?: any[];
  refunds?: any[];
  payment_url?: string;
  is_editable?: boolean;
  needs_payment?: boolean;
  needs_processing?: boolean;
  date_created_gmt?: string;
  date_modified_gmt?: string;
  date_completed_gmt?: null;
  date_paid_gmt?: null;
  currency_symbol?: string;
  _links?: Links;
}

interface Links {
  self: Collection[];
  collection: Collection[];
}

interface Collection {
  href: string;
}

interface Ing {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone: string;
}

export interface OrderLineItem {
  id?: number;
  name?: string;
  product_id: number;
  variation_id?: number;
  quantity: number;
  tax_class?: string;
  subtotal?: string;
  subtotal_tax?: string;
  total?: string;
  total_tax?: string;
  taxes?: any[];
  meta_data?: MetaDatum[];
  sku?: string;
  price?: number;
  image?: Image;
  parent_name?: string;
}

interface Image {
  id: number;
  src: string;
}

interface MetaDatum {
  id: number;
  key: Key;
  value: string;
  display_key: DisplayKey;
  display_value: string;
}

enum DisplayKey {
  Color = 'Color',
  Size = 'Size',
}

enum Key {
  PaColor = 'pa_color',
  PaSize = 'pa_size',
}