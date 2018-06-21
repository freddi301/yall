import * as _ from 'lodash';
import { Ast, AstPath } from '../Ide/AstView/AstInterpreter';
import { identity, Lens, properties, set } from '../util/lens';
import { actionsOf, reducerOf } from '../util/reduxLike';
import { IdeState } from './state';

export type IdeState = { ast: Ast; selected: AstPath };

export const handlers = {
  select: (state: IdeState, { path }: { path: AstPath }) => {
    const ide = properties<IdeState>();
    return ide.selected[set](path)(state);
  },
  replace: (state: IdeState, { path, ast }: { path: AstPath; ast: Ast }) => {
    const ide = properties<IdeState>();
    const astLens: Lens<Ast, Ast> = _.get(properties<Ast>(), path, identity());
    const newAst = astLens[set](ast)(state.ast);
    return ide.ast[set](newAst)(state);
  }
};

export const actions = actionsOf(handlers);

export const reducer = reducerOf<IdeState, typeof handlers>(handlers);
