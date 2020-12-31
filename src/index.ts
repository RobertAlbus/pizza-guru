require('dotenv').config();

import { InputReader, Preprocessor, Calculator, OutputPrinter, InputValidator } from './pipeline-stages';
import { IPipelineStage, Pipeline } from './pipeline';

const stages: IPipelineStage<any, any>[] = [
  new InputReader(),
  new InputValidator(),
  new Preprocessor(),
  new Calculator(),
  new OutputPrinter(),
];
const pipeline = new Pipeline(stages);

pipeline.run();

