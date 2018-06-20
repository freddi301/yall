import * as _ from 'lodash';
import { Ast, AstPath } from '../Ide/AstView/AstInterpreter';
import * as lens from '../util/lens';
import { IdeState } from './state';

export const select = ({ path }: { path: AstPath }) => (ideState: IdeState): IdeState => {
  return { ...ideState, selected: path };
};

export const replace = (args: { path: AstPath; ast: Ast }) => (ideState: IdeState): IdeState => {
  const astLens: lens.Lens<Ast, Ast> = _.get(lens.properties<Ast>(), args.path, lens.identity);
  const newAst = astLens[lens.set](args.ast)(ideState.ast);
  return { ...ideState, ast: newAst };
};
