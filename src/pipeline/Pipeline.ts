import { ICalculator } from '../calculate';
import { IInput, IOutput } from '../io';
import { IPreprocessor } from '../preprocess';

export interface IPipeline {
  run(): void;
}

export class Pipeline implements IPipeline {
  private input: IInput;
  private preprocessor: IPreprocessor;
  private calculator: ICalculator;
  private output: IOutput;

  constructor() {
    this.input = {} as IInput;
    this.preprocessor = {} as IPreprocessor;
    this.calculator = {} as ICalculator;
    this.output = {} as IOutput;
  }

  public run(): void {
    this.input.ingest();
    const input = this.input.getResult();

    this.preprocessor.ingest(input);
    const preprocessed = this.preprocessor.getResult();

    this.calculator.ingest(preprocessed);
    const calculated = this.calculator.getResult();

    this.output.ingest(calculated);
    // @ts-ignore
    const output = this.output.getResult();
  }
}
