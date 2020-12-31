import { Order, Pizza } from '../models';
import { IPipelineStage } from '../pipeline';

export interface IPreprocessor extends IPipelineStage<string, Order> {}

export class Preprocessor implements IPreprocessor, IPipelineStage<string, Order> {
  process(input: string): Order {
    this.validate(input);

    const result = this.buildOutput(input);
    return result;
  }

  private validate(input: string): void {
    if (!input || typeof input != 'string') {
      throw new Error('Preprocessor received invalid input.');
    }
  }

  private buildOutput(input: string): Order {
    const order: Order = {
      pizzas: [],
    };

    //split to individual pizzas
    const pizzas = input.split('\n');

    // split pizza string into pizza objects
    pizzas.forEach((pizzaString) => {
      const pizza = {} as Pizza;
      pizza.size = this.getSizeFromPizzaString(pizzaString);
      pizza.toppings = this.getToppingsFromPizza(pizzaString) || [];

      order.pizzas.push(pizza);
    });

    return order;
  }

  getToppingsFromPizza(pizza: string): string[] {
    return pizza
      .replace(/\s/g, '')
      .split('-')[1]
      .split(',')
      .filter((topping) => {
        return !!topping;
      });
  }

  private getSizeFromPizzaString(pizza: string): string {
    return pizza.replace(/\s/g, '').split('-')[0];
  }
}
