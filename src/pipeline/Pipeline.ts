import { IPipelineStage, IPipelineStages } from '.';

export interface IPipeline<TInput, TOutput> extends IPipelineStage<TInput, TOutput> {}

export class MonoPipeline<TInput, TOutput> implements IPipeline<TInput, TOutput> {
  constructor(private stages: IPipelineStages<any, any>) {}

  process(input: TInput): TOutput {
    const stack: any[] = [input] || [];
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

    return (stack[stack.length - 1] as unknown) as TOutput;
  }
}
