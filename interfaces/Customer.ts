export interface CustomerType {
  name: string;
  email: string;
}

export interface CustomersType {
  id: string;
  object: string;
  address: string;
  balance: number;
  created: number;
  currency: string;
  default_source: string;
  delinquent: boolean;
  description: string;
  discount: string | number;
  email: string;
  invoice_prefix: string;
  invoice_settings: {
    custom_fields?: object;
    default_payment_method: string;
    footer?: string;
  };
  livemode: boolean;
  metadata: object;
  name: string;
  next_invoice_sequence: number;
  phone: number;
  preferred_locales: string[];
  shipping: string;
  tax_exempt: string | number;
}
