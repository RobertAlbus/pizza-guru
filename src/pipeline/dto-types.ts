export type InputData = string;

export type PreprocessedData = Order;

export type CalculatedResult = OrderWithPrice;

export interface Pizza {
  size: string;
  toppings: string[];
}

export interface PizzaWithPrice extends Pizza {
  price: number;
}

export interface Order {
  pizzas: Pizza[];
}

export interface OrderWithPrice extends Order {
  pizzas: PizzaWithPrice[];
  subtotal: number;
  tax: number;
  total: number;
}
