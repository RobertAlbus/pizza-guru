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
        stage.ingest(stack[stack.length - 1]);
        stack.push(stage.getResult());
      });
    } catch (error) {
      console.clear();
      console.log(error.message);
    }
  }
}
