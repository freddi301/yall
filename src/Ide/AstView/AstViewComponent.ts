import { Ast } from '../../core/Ast';
import { AstPath } from '../../core/Path';

export type AstViewComponent<T extends Ast> = React.ComponentType<{
  ast: T;
  path: AstPath;
}>;
