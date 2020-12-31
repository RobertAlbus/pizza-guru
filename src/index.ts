require('dotenv').config();

import { InputReader, Preprocessor, Calculator, OutputPrinter } from './pipeline-stages';
import { Pipeline } from './pipeline';

const stages = [new InputReader(), new Preprocessor(), new Calculator(), new OutputPrinter()];
const pipeline = new Pipeline(stages);

pipeline.run();
