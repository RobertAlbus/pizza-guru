import { readFileSync } from 'fs';
import * as path from 'path';

export interface IEnvConfigService {
  getConfigFromFile(envVarName: string): string;
  getConfigFromEnvVar(envVarName: string): string;
}

export class EnvConfigService implements IEnvConfigService {
  public getConfigFromFile(envVarName: string): string {
    const envValue = process.env[envVarName];
    if (!envValue) {
      throw this.createEnvError(envVarName);
    }

    const filePath = path.join(__dirname, '../../' + envValue);
    const fileContents = readFileSync(filePath, 'utf8');

    return fileContents;
  }

  public getConfigFromEnvVar(envVarName: string): string {
    const envValue = process.env[envVarName];
    if (!envValue) {
      throw this.createEnvError(envVarName);
    }

    return envValue;
  }

  private createEnvError(envVarName: string): Error {
    return new Error(`Input file path not specified. Set ${envVarName} environment variable.`);
  }
}
