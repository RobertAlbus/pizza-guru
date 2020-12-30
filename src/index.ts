require('dotenv').config();

import { Calculator } from './calculate';
import { InputReader, OutputPrinter } from './io';
import { Preprocessor } from './preprocess';
import { Pipeline } from './pipeline';

const stages = [new InputReader(), new Preprocessor(), new Calculator(), new OutputPrinter()];
const pipeline = new Pipeline(stages);

pipeline.run();
