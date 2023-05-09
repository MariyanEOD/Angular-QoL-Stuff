export interface User {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: null;
  date_modified_gmt: null;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
  billing: Address;
  shipping: Address;
  is_paying_customer: boolean;
  avatar_url: string;
  meta_data: any[];
  _links: Links;
}

export interface Links {
  self: Collection[];
  collection: Collection[];
}

export interface Collection {
  href: string;
}

export interface Address {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  postcode: string;
  country: string;
  state: string;
  email?: string;
  phone: string;
}

export interface WordpressUser {
  id: number;
  date_created: Date;
  date_created_gmt: Date;
  date_modified: null;
  date_modified_gmt: null;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
  billing: Ing;
  shipping: Ing;
  is_paying_customer: boolean;
  avatar_url: string;
  meta_data: any[];
  _links: Links;
}

interface Ing {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  postcode: string;
  country: string;
  state: string;
  email?: string;
  phone: string;
}
