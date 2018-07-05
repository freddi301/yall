import * as React from "react";
import { IdeContext } from "../../Ide/Ide";
import { AstPath } from "../../modules/AstView/Path";
import { Reference } from "./Reference";
import { ReferenceComponent } from "./ReferenceComponent";

export const ReferenceContainer = ({ ast, path }: { ast: Reference; path: AstPath }) => (
  <IdeContext.Consumer>
    {({ dispatch, actions: { select } }) => <ReferenceComponent name={ast.name} onEvent={{ select: () => dispatch([select({ path })]) }} />}
  </IdeContext.Consumer>
);
