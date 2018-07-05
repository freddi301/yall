import * as React from "react";
import { IdeContext } from "../../Ide/Ide";
import { AstPath } from "../../modules/AstView/Path";
import { Argument } from "./Argument";
import { ArgumentComponent } from "./ArgumentComponent";

export const ArgumentContainer = ({ ast, path }: { ast: Argument; path: AstPath }) => (
  <IdeContext.Consumer>
    {({ dispatch, actions: { select } }) => <ArgumentComponent name={ast.name} onEvent={{ select: () => dispatch([select({ path })]) }} />}
  </IdeContext.Consumer>
);
