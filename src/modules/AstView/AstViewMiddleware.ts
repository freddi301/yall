import { Ast } from "../../modules/AstView/Ast";
import { AstPath } from "../../modules/AstView/Path";

export type AstComponentMiddleware<T extends Ast> = React.ComponentType<{
  ast: T;
  path: AstPath;
}>;
