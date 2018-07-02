import * as React from 'react';
import { Ast } from '../../core/Ast';
import { AstPath } from '../../core/Path';
import { AstViewComponent } from './AstViewComponent';
import { UnknownAst } from './UnknownAst';

export const AstViewSelectorFactory = ({ components }: { components: Map<string, AstViewComponent<Ast>> }) => ({
  ast,
  path
}: {
  ast: Ast;
  path: AstPath;
}) => {
  const Component = components.get(ast.kind) || UnknownAst;
  return <Component ast={ast} path={path} />;
};
