import * as React from 'react';
import { Ast, abs, app, arg, ref } from './components';
import { Observable } from './components/ObservableView';
import { ViewIde } from './components/ViewIde';

const program: Ast = abs(arg('f'), abs(arg('a'), abs(arg('b'), app(app(ref('f'), ref('b')), ref('a')))));

export default () => (
  <code>
    <Observable view={ViewIde} initial={{ selected: [], ast: program }} />
  </code>
);
