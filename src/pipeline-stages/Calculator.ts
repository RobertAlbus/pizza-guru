import { PizzaWithPrice, Order, OrderWithPrice } from '../models';
import { IPipelineStage } from '../pipeline';
import { PriceService } from '../services';

export interface ICalculator extends IPipelineStage<Order, OrderWithPrice> {}

export class Calculator implements ICalculator, IPipelineStage<Order, OrderWithPrice> {
  private data = {} as OrderWithPrice;
  private priceService: PriceService;

  constructor() {
    this.priceService = new PriceService();
  }

  ingest(input?: Order): void {
    if (!input || !input.pizzas) {
      throw new Error('Calculator received invalid input.');
    }

    this.data = this.process(input);
  }
  getResult(): OrderWithPrice {
    return this.data;
  }

  private process(input: Order): OrderWithPrice {
    let order = this.convertOrder(input);

    order.pizzas.forEach((pizza) => {
      this.calculatePizzaPrice(pizza);
    });
    this.calculateOrderPrice(order);

    return order;
  }

  private convertOrder(input: Order): OrderWithPrice {
    const order = input as OrderWithPrice;

    input.pizzas.forEach((pizza) => {
      pizza = pizza as PizzaWithPrice;
    });

    return order;
  }

  private calculatePizzaPrice(pizza: PizzaWithPrice): void {
    pizza.price = 0.0;
    pizza.price += this.priceService.getPizzaBasePrice(pizza.size);

    pizza.toppings.forEach((topping) => {
      pizza.price += this.priceService.getToppingPrice(topping, pizza.size);
    });
  }

  private calculateOrderPrice(order: OrderWithPrice): void {
    this.calculateOrderSubtotal(order);
    this.calculateOrderTax(order);
    this.calculateOrderTotal(order);
  }

  private calculateOrderSubtotal(order: OrderWithPrice): void {
    order.subtotal = 0.0;
    order.pizzas.forEach((pizza) => {
      order.subtotal += pizza.price;
    });
  }

  private calculateOrderTax(order: OrderWithPrice): void {
    const tax = order.subtotal * this.priceService.getTaxRate();
    order.tax = this.roundPenny(tax);
  }

  private roundPenny(price: number): number {
    const partialPenny = (price * 100) % 1;
    if (partialPenny) {
      return Math.round((price + Number.EPSILON) * 100) / 100;
    } else {
      return price;
    }
  }

  private calculateOrderTotal(order: OrderWithPrice): void {
    order.total = order.subtotal + order.tax;
  }
}
