import { IPipelineStage } from '../pipeline';
import { EnvConfigService, IEnvConfigService } from '../services/EnvConfigService';

export interface IInput extends IPipelineStage<void, string> {}

export class InputReader implements IInput, IPipelineStage<void, string> {
  private configService: IEnvConfigService;

  constructor() {
    this.configService = new EnvConfigService();
  }

  process(): string {
    return this.configService.getConfigFromFile('INPUT_LOCATION');
  }
}
