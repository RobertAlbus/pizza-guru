import { IPipelineStage } from '../pipeline';
import { readFileSync } from 'fs';
import * as path from 'path';

export interface IInputValidator extends IPipelineStage<string, string> {}

export class InputValidator implements IInputValidator, IPipelineStage<string, string> {
  private data: string = '';

  ingest(input: string): void {
    this.validate(input);
    this.data = input;
  }

  private validate(input: string) {
    if (!process.env.REGEX_VALIDATOR_LOCATION) {
      throw new Error('Input file path not specified. Set REGEX_VALIDATOR_LOCATION environment variable.');
    }

    const regexFilePath = path.join(__dirname, '../../' + process.env.REGEX_VALIDATOR_LOCATION);
    const pattern = readFileSync(regexFilePath, 'utf8');

    const regex = new RegExp(pattern);
    input.split('\n').forEach((line) => {
      const regexFail = !regex.test(line);
      if (regexFail) {
        throw new Error(`The following line in your order is invalid: \n\n ${line} \n\n`);
      }
    });
  }

  getResult(): string {
    return this.data;
  }
}
