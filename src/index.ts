require('dotenv').config();

import { InputReader, Preprocessor, Calculator, OutputPrinter, InputValidator } from './pipeline-stages';
import { Pipeline } from './pipeline';

const stages = [new InputReader(), new InputValidator(), new Preprocessor(), new Calculator(), new OutputPrinter()];
const pipeline = new Pipeline(stages);

pipeline.run();

