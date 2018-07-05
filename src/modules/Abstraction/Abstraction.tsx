import { Ast } from "../../modules/AstView/Ast";
import { Argument } from "../Argument/Argument";

export const kind = "abstraction";
export const AbstractionKind = kind;
export type Abstraction = { kind: typeof kind; head: Argument; body: Ast };
export const abs = (head: Argument, body: Ast): Abstraction => ({ kind, head, body });
