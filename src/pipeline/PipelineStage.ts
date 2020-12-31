export interface IPipelineStage<TInput, TOutput> {
  process(input?: TInput): TOutput;
}
