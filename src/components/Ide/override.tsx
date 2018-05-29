import * as _ from 'lodash';
import * as React from 'react';
import { Ast, AstPath, Reference } from '..';
import * as lens from '../../util/lens';
import { Input } from '../Input';
import { IdeState } from './ViewIde';

export const override = ({ state, update }: { state: IdeState; update: (state: IdeState) => void }) => (path: AstPath) => {
  const { selected, ast } = state;
  if (_.isEqual(selected, path)) {
    const inIde = lens.properties<IdeState>();
    const inAst: lens.Lens<Ast, Ast> = _.get(lens.properties<Ast>(), path, lens.identity);
    const setAst = inAst[lens.set];
    const term = _.get(ast, selected, ast);
    const updateReference = (reference: Reference) => (name: string) =>
      update(inIde.ast[lens.set](setAst({ ...reference, name })(ast))(state));
    if (term.kind === 'reference') {
      return <Input value={term.name} onChange={updateReference(term)} />;
    }
  }
  return;
};
