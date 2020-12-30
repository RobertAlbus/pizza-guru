import { InputData, IPipelineStage } from '../pipeline';
import {} from '../pipeline';

export interface IInput extends IPipelineStage<void, InputData> {}

export class InputReader implements IInput, IPipelineStage<void, InputData> {
  // @ts-ignore
  ingest(input?: void): void {
    throw new Error('Method not implemented.');
  }
  getResult(): string {
    throw new Error('Method not implemented.');
  }
}
