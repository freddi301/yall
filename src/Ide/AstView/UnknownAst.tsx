import * as React from 'react';
import { Ast } from './AstInterpreter';

export const UnknownAst = ({ ast }: { ast: Ast }) => (
  <div>
    <span>Unknow Ast</span>
    <code>{JSON.stringify(ast, null, 2)}</code>
  </div>
);
