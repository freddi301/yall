import * as React from "react";
import { IdeContext } from "../../Ide/Ide";
import { AstPath } from "../../modules/AstView/Path";
import { AstViewContext } from "../AstView/AstView";
import { Abstraction } from "./Abstraction";
import { AbstractionComponent } from "./AbstractionComponent";

export const AbstractionContainer = ({ ast, path }: { ast: Abstraction; path: AstPath }) => (
  <AstViewContext.Consumer>
    {View => (
      <IdeContext.Consumer>
        {({ dispatch, actions: { select } }) => (
          <AbstractionComponent
            head={<View ast={ast.head} path={path.concat("head")} />}
            body={<View ast={ast.body} path={path.concat("body")} />}
            onEvent={{ select: () => dispatch([select({ path })]) }}
          />
        )}
      </IdeContext.Consumer>
    )}
  </AstViewContext.Consumer>
);
