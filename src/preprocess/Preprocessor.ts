import { InputData, IPipelineStage, PreprocessedData } from '../pipeline';
import { Order, Pizza } from '../pipeline/dto-types';

export interface IPreprocessor extends IPipelineStage<InputData, PreprocessedData> {}

export class Preprocessor implements IPreprocessor, IPipelineStage<InputData, PreprocessedData> {
  private data = {} as Order;

  ingest(input?: string): void {
    if (!input || typeof input != 'string') {
      throw new Error('Preprocessor received invalid input.');
    }

    this.data = this.process(input);
  }

  getResult(): Order {
    return this.data;
  }

  private process(input: string): Order {
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
