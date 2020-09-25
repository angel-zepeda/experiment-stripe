export interface PriceType {
  id: string;
  object: object;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: 'usd';
  livemode: boolean;
  lookup_key: string;
  metadata: object;
  nickname: string;
  product: string;
  recurring: {
    aggregate_usage: string;
    interval: 'day' | 'week' | 'month' | 'year';
    interval_count: number;
    usage_type: string;
  };
  tiers_mode: 'volume' | 'graduated';
  transform_quantity: null;
  type: string;
  unit_amount: 1000;
  unit_amount_decimal: 1000;
}
