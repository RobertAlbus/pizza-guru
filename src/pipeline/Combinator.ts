import { IPipeline } from '.';

export type ICombinator2<TIn, TOut> = (a: TIn, b: TIn) => TOut;

export class YCombinatorPipeline<TOutput, TCombinator extends ICombinator2<any, any>>
  implements IPipeline<TCombinator, TOutput> {
  constructor(private pipelines: [IPipeline<any, TOutput>, IPipeline<any, TOutput>]) {}

  process(combinator: TCombinator): TOutput {
    let result_0: TOutput = {} as TOutput;
    let result_1: TOutput = {} as TOutput;

    try {
      result_0 = this.pipelines[0].process();
      result_1 = this.pipelines[1].process();
    } catch (error) {
      console.clear();
      console.log(error.message);
    }

    return combinator(result_0, result_1);
  }
}
