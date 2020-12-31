import { IPipelineStage } from '../pipeline';
import { readFileSync } from 'fs';
import * as path from 'path';

export interface IInput extends IPipelineStage<void, string> {}

export class InputReader implements IInput, IPipelineStage<void, string> {
  private data: string = '';

  // @ts-ignore
  ingest(): void {
    this.validate();

    const inputFilePath = path.join(__dirname, '../../' + process.env.INPUT_LOCATION);
    this.data = readFileSync(inputFilePath, 'utf8');
  }

  private validate() {
    if (!process.env.INPUT_LOCATION) {
      throw new Error('Input file path not specified. Set INPUT_LOCATION environment variable.');
    }
  }

  getResult(): string {
    return this.data;
  }
}
