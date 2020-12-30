import { ICalculator } from '../calculate';
import { IInput, IOutput } from '../io';
import { IPreprocessor } from '../preprocess';
import { State } from './dto-types';

export interface IPipeline {
  run(): void;
}

export class Pipeline implements IPipeline {
  private input: IInput;
  private preprocessor: IPreprocessor;
  private calculator: ICalculator;
  private output: IOutput;

  private state: State;

  constructor() {
    this.input = {} as IInput;
    this.preprocessor = {} as IPreprocessor;
    this.calculator = {} as ICalculator;
    this.output = {} as IOutput;
    this.state = {} as State;
  }

  public run(): void {}
}
