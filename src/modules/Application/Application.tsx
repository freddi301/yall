import { Ast } from "../../modules/AstView/Ast";

export const kind = "application";
export const ApplicationKind = kind;
export type Application = { kind: typeof kind; left: Ast; right: Ast };
export const app = (left: Ast, right: Ast): Application => ({ kind, left, right });
