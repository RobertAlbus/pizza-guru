export interface Pizza {
  size: string;
  toppings: string[];
}

export interface PizzaWithPrice extends Pizza {
  price: number;
}
