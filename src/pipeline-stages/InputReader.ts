import { IPipelineStage } from '../pipeline';
import { EnvConfigService, IEnvConfigService } from '../services/EnvConfigService';

export interface IInput extends IPipelineStage<void, string> {}

export class InputReader implements IInput, IPipelineStage<void, string> {
  private configService: IEnvConfigService;
  private data: string = '';

  constructor() {
    this.configService = new EnvConfigService();
  }

  // @ts-ignore
  ingest(): void {
    this.data = this.configService.getConfigFromFile('INPUT_LOCATION');
  }

  getResult(): string {
    return this.data;
  }
}
