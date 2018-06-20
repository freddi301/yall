import * as React from 'react';
import { Observable } from './components/ObservableView';
import { Ast } from './Ide/AstView/AstInterpreter';
import { Ide } from './Ide/Ide';
import { abs } from './plugins/Abstraction/Abstraction';
import { app } from './plugins/Application/Application';
import { arg } from './plugins/Argument/Argument';
import { ref } from './plugins/Reference/Reference';

const program: Ast = abs(arg('f'), abs(arg('a'), abs(arg('b'), app(app(ref('f'), ref('b')), ref('a')))));

export default () => <Observable view={Ide} initial={{ selected: [], ast: program }} />;
