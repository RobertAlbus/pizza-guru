export interface IPipelineStage<TInput, TOutput> {
  process(input?: TInput): TOutput;
}

export type IPipelineStages<TInput = any, TOutput = any> = IPipelineStage<TInput, TOutput>[];
