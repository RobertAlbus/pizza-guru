import { IPipelineStage } from '../pipeline';
import { default as equal } from 'deep-equal';
import { OrderWithPrice } from '../models';

export interface IOutput extends IPipelineStage<OrderWithPrice, void> {}

export class OutputPrinter implements IOutput, IPipelineStage<OrderWithPrice, void> {
  process(input: OrderWithPrice): void {
    this.validate(input);

    const output = this.buildOutput(input);

    console.clear();
    console.log(output);
  }

  private validate(input: OrderWithPrice): void {
    if (!input) {
      throw new Error('Output Printer did not receive data');
    }
  }

  private buildOutput(order: OrderWithPrice): string {
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
      outputString += `${pizza.toppings.join(', ')}: \$${pizza.price.toFixed(2)} \n`;
    }

    // build output for order price
    outputString += `\n`;
    outputString += `Subtotal: \$${order.subtotal.toFixed(2)} \n`;
    outputString += `GST:      \$${order.tax.toFixed(2)} \n`;
    outputString += `Total:    \$${order.total.toFixed(2)} \n`;

    return outputString;
  }
}
