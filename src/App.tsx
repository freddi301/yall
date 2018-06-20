import * as React from 'react';
import { abs } from './components/Abstraction';
import { app } from './components/Application';
import { arg } from './components/Argument';
import { Ast } from './components/AstInterpreter';
import { ref } from './components/Reference';
import { Ide } from './Ide/Ide';
import { Observable } from './util/ObservableView';

const program: Ast = abs(arg('f'), abs(arg('a'), abs(arg('b'), app(app(ref('f'), ref('b')), ref('a')))));

export default () => <Observable view={Ide} initial={{ selected: [], ast: program }} />;
