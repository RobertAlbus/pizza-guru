import { CalculatedResult, IPipelineStage, PreprocessedData } from '../pipeline';
import { Order, OrderWithPrice } from '../pipeline/dto-types';

export interface ICalculator extends IPipelineStage<PreprocessedData, CalculatedResult> {}

export class Calculator implements ICalculator, IPipelineStage<PreprocessedData, CalculatedResult> {
  ingest(input?: Order): void {
    throw new Error('Method not implemented.');
  }
  getResult(): OrderWithPrice {
    throw new Error('Method not implemented.');
  }
}
