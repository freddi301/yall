import * as React from 'react';
import { Observable } from './components/ObservableView';
import { Ast } from './core/Ast';
import { Ide } from './Ide/Ide';
import { ref } from './plugins/Reference/Reference';

const program: Ast = ref('');

export default () => <Observable view={Ide} initial={{ selected: [], ast: program }} />;
