import { InputData, IPipelineStage, PreprocessedData } from '../pipeline';
import { Order } from '../pipeline/dto-types';

export interface IPreprocessor extends IPipelineStage<InputData, PreprocessedData> {}

export class Preprocessor implements IPreprocessor, IPipelineStage<InputData, PreprocessedData> {
  ingest(input?: string): void {
    throw new Error('Method not implemented.');
  }
  getResult(): Order {
    throw new Error('Method not implemented.');
  }
}
