import * as React from 'react';
import { Ast, abs, app, arg, ref } from './components';
import { ViewIde } from './components/Ide/ViewIde';
import { Observable } from './components/ObservableView';

const program: Ast = abs(arg('f'), abs(arg('a'), abs(arg('b'), app(app(ref('f'), ref('b')), ref('a')))));

export default () => <Observable view={ViewIde} initial={{ selected: [], ast: program }} />;
