import * as path from 'path';

export interface IPriceService {}

export class PriceService implements IPriceService {
  private data: any = {};

  constructor() {
    if (!process.env.PRICE_JSON_LOCATION) {
      throw new Error('Price file path not specified. Set PRICE_JSON_LOCATION environment variable.');
    }

    const inputFilePath = path.join(__dirname, '../../' + process.env.PRICE_JSON_LOCATION);

    this.data = require(inputFilePath);
  }

  public getPizzaBasePrice(size: string): number {
    const basePrice = this.data.basePrice[size];

    if (basePrice) {
      return parseFloat(basePrice);
    }

    throw new Error(`No price data for pizza size: ${size}`);
  }

  public getToppingPrice(toppingName: string, size: string): number {
    const topping = this.data.toppings[toppingName];
    const toppingPrice = topping && topping[size];

    if (toppingPrice) {
      return parseFloat(toppingPrice);
    }

    throw new Error(`No price data for ${toppingName} on ${size} size pizza`);
  }

  public getTaxRate(): number {
    const taxRate = this.data.taxRate;

    if (taxRate) {
      return taxRate;
    }

    throw new Error(`No tax rate specified in price data`);
  }
}
