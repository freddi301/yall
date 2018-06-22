import { Ast } from '../../core/Ast';
import { AstPath } from '../../core/Path';

export type AstComponentMiddleware<T extends Ast> = React.ComponentType<{
  ast: T;
  path: AstPath;
}>;
