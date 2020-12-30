import { InputData, IPipelineStage } from '../pipeline';
import { readFileSync } from 'fs';
import * as path from 'path';

export interface IInput extends IPipelineStage<void, InputData> {}

export class InputReader implements IInput, IPipelineStage<void, InputData> {
  private data: string = '';

  // @ts-ignore
  ingest(input?: void): void {
    if (!process.env.INPUT_LOCATION) {
      throw new Error('Input file path not specified. Set INPUT_LOCATION environment variable.');
    }

    const inputFilePath = path.join(__dirname, '../../' + process.env.INPUT_LOCATION);

    this.data = readFileSync(inputFilePath, 'utf8');
  }

  getResult(): string {
    return this.data;
  }
}
