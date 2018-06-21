import * as _ from 'lodash';
import { Ast, AstPath } from '../Ide/AstView/AstInterpreter';
import * as lens from '../util/lens';
import { IdeState } from './state';

export const select = ({ path }: { path: AstPath }) => (ideState: IdeState): IdeState => {
  return { ...ideState, selected: path };
};

export const replace = (args: { path: AstPath; ast: Ast }) => (ideState: IdeState): IdeState => {
  const astLens: lens.Lens<Ast, Ast> = _.get(lens.properties<Ast>(), args.path, lens.identity());
  const newAst = astLens[lens.set](args.ast)(ideState.ast);
  return { ...ideState, ast: newAst };
};

export const actions = {
  select: (state: IdeState, { path }: { path: AstPath }) => {
    return lens.properties<IdeState>().selected[lens.set](path)(state);
  },
  replace: (state: IdeState, args: { path: AstPath; ast: Ast }) => {
    const astLens: lens.Lens<Ast, Ast> = _.get(lens.properties<Ast>(), args.path, lens.identity());
    const newAst = astLens[lens.set](args.ast)(state.ast);
    return lens.properties<IdeState>().ast[lens.set](newAst)(state);
  }
};
