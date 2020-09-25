export interface ProductType {
  name: string;
  description?: string;
  metadata?: object;
}

export interface ProductsType {
  id: string;
  object: object;
  active: boolean;
  attributes: string[];
  created: number;
  description: string;
  images: string[];
  livemode: boolean;
  metadata: object;
  name: string;
  statement_descriptor: string | boolean;
  unit_label: string;
  updated: string;
}