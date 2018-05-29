import * as React from 'react';
import { Observable } from './components/ObservableView';
import { Ast } from './components/AstInterpreter';
import { ref } from './components/Reference';
import { Ide } from './components/Ide';
import { app } from './components/Application';
import { abs, arg } from './components/Abstraction';

const program: Ast = abs(arg('f'), abs(arg('a'), abs(arg('b'), app(app(ref('f'), ref('b')), ref('a')))));

export default () => <Observable view={Ide} initial={{ selected: [], ast: program }} />;
