import * as _ from "lodash";
import { identity, Lens, properties, set } from "../../util/lens";
import { actionsOf, reducerOf } from "../../util/reduxLike";
import { Ast } from "./Ast";
import { AstPath } from "./Path";
import { AstViewState } from "./state";

export type AstViewState = { ast: Ast; selected: AstPath };

export const handlers = {
  select: (state: AstViewState, { path }: { path: AstPath }) => {
    const ide = properties<AstViewState>();
    return ide.selected[set](path)(state);
  },
  replace: (state: AstViewState, { path, ast }: { path: AstPath; ast: Ast }) => {
    const ide = properties<AstViewState>();
    const astLens: Lens<Ast, Ast> = _.get(properties<Ast>(), path, identity());
    const newAst = astLens[set](ast)(state.ast);
    return ide.ast[set](newAst)(state);
  }
};

export const actions = actionsOf(handlers);

export const reducer = reducerOf<AstViewState, typeof handlers>(handlers);
