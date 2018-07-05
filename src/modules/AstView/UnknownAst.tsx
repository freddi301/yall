import * as React from "react";
import { Ast } from "../../modules/AstView/Ast";
import { AstPath } from "../../modules/AstView/Path";

export const UnknownAst = ({ ast }: { ast: Ast; path: AstPath }) => (
  <div>
    <span>Unknow Ast</span>
    <code>{JSON.stringify(ast, null, 2)}</code>
  </div>
);
