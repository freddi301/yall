import * as React from 'react';
import { abs } from './components/Abstraction';
import { app } from './components/Application';
import { arg } from './components/Argument';
import { Ast } from './components/AstInterpreter';
import { Ide } from './components/Ide';
import { Observable } from './components/ObservableView';
import { ref } from './components/Reference';

const program: Ast = abs(arg('f'), abs(arg('a'), abs(arg('b'), app(app(ref('f'), ref('b')), ref('a')))));

export default () => <Observable view={Ide} initial={{ selected: [], ast: program }} />;
