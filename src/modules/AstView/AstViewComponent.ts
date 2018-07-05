import { Ast } from "../../modules/AstView/Ast";
import { AstPath } from "../../modules/AstView/Path";

export type AstViewComponent<T extends Ast> = React.ComponentType<{
  ast: T;
  path: AstPath;
}>;
