import { IPipelineStage } from '.';

export interface IPipeline {
  run(input?: any[]): any;
}

export class Pipeline implements IPipeline {
  constructor(private stages: IPipelineStage<any, any>[]) {}

  public run(input: any[] = []): any {
    const stack = input;
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

    return stack[stack.length - 1];
  }
}
