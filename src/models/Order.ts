import { Pizza, PizzaWithPrice } from './Pizza';

export interface Order {
  pizzas: Pizza[];
}

export interface OrderWithPrice extends Order {
  pizzas: PizzaWithPrice[];
  subtotal: number;
  tax: number;
  total: number;
}
