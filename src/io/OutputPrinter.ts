import { CalculatedResult, IPipelineStage } from '../pipeline';
import { OrderWithPrice } from '../pipeline/dto-types';

export interface IOutput extends IPipelineStage<CalculatedResult, void> {}

export class OutputPrinter implements IOutput, IPipelineStage<CalculatedResult, void> {
  ingest(input?: OrderWithPrice): void {
    throw new Error('Method not implemented.');
  }
  getResult(): void {
    throw new Error('Method not implemented.');
  }
}
