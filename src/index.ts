require('dotenv').config();

import { InputReader, Preprocessor, Calculator, OutputPrinter, InputValidator } from './pipeline-stages';
import { IPipelineStages, MonoPipeline } from './pipeline';

const stages: IPipelineStages = [
  new InputReader(),
  new InputValidator(),
  new Preprocessor(),
  new Calculator(),
  new OutputPrinter(),
];
const pipeline = new MonoPipeline<void, void>(stages);

pipeline.process();
