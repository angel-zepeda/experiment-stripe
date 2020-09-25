export interface PlanType {
  amount: number;
  currency: 'usd';
  interval: 'day' | 'week' | 'month' | 'year';
  product: string;
}