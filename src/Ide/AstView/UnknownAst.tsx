import * as React from 'react';
import { Ast } from '../../core/Ast';
import { AstPath } from '../../core/Path';

export const UnknownAst = ({ ast }: { ast: Ast; path: AstPath }) => (
  <div>
    <span>Unknow Ast</span>
    <code>{JSON.stringify(ast, null, 2)}</code>
  </div>
);
