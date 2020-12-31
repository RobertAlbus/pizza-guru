import { IPipelineStage } from '../pipeline';
import { EnvConfigService, IEnvConfigService } from '../services/EnvConfigService';

export interface IInputValidator extends IPipelineStage<string, string> {}

export class InputValidator implements IInputValidator, IPipelineStage<string, string> {
  private configService: IEnvConfigService;
  private data: string = '';

  constructor() {
    this.configService = new EnvConfigService();
  }

  ingest(input: string): void {
    this.validate(input);
    this.data = input;
  }

  private validate(input: string) {
    const pattern = this.configService.getConfigFromFile('REGEX_VALIDATOR_LOCATION');

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
