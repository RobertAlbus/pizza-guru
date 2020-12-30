export interface IPipelineStage<TInput, TOutput> {
  ingest(input?: TInput): void;
  getResult(): TOutput;
}
