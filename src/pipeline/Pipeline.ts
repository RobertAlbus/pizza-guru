import { IPipelineStage } from '.';

export interface IPipeline {
  run(): void;
}

export class Pipeline implements IPipeline {
  constructor(private stages: IPipelineStage<any, any>[]) {}

  public run(): void {
    const stack: any[] = [];
    try {
      this.stages.forEach((stage) => {
        const previousStage = stack[stack.length - 1];
        const output = stage.process(previousStage);
        stack.push(output);
      });
    } catch (error) {
      console.clear();
      console.log(error.message);
    }
  }
}
