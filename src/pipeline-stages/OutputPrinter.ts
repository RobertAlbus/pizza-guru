import { IPipelineStage } from '../pipeline';
import { default as equal } from 'deep-equal';
import { OrderWithPrice } from '../models';

export interface IOutput extends IPipelineStage<OrderWithPrice, void> {}

export class OutputPrinter implements IOutput, IPipelineStage<OrderWithPrice, void> {
  private data: string = '';

  ingest(input?: OrderWithPrice): void {
    if (!input) {
      throw new Error('Output Printer did not receive data');
    }
    this.data = this.process(input);
  }

  getResult(): void {
    console.clear();
    console.log(this.data);
  }

  private process(order: OrderWithPrice): string {
    let outputString = '';

    while (order.pizzas.length) {
      const pizza = order.pizzas.shift();
      if (!pizza) break;

      // count matched pizzas
      let count = 1;
      const pizzaMatches = order.pizzas.filter((comparePizza) => {
        return equal(pizza, comparePizza);
      });
      count += pizzaMatches.length;

      // remove matched pizzas from list
      order.pizzas = order.pizzas.filter((comparePizza) => {
        return !equal(pizza, comparePizza);
      });

      // build output for pizza items
      outputString += `${count} ${pizza.size}, ${pizza.toppings.length} topping pizza - `;
      outputString += `${pizza.toppings.join(', ')}: ${pizza.price} \n`;
    }

    // build output for order price
    outputString += `Subtotal: \$ ${order.subtotal.toFixed(2)} \n`;
    outputString += `GST: \$ ${order.tax.toFixed(2)} \n`;
    outputString += `Total: \$ ${order.total.toFixed(2)} \n`;

    return outputString;
  }
}
