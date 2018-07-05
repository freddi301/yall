import * as _ from "lodash";
import * as React from "react";
import { IdeContext } from "../../Ide/Ide";
import { Ast } from "../../modules/AstView/Ast";
import { AstComponentMiddleware } from "../AstView/AstViewMiddleware";
import { HighlightComponent } from "./HighlightComponent";

export const HighlightComponentMiddleware: AstComponentMiddleware<Ast> = ({ path, children }) => (
  <IdeContext.Consumer>
    {({ state: { selected } }) => (_.isEqual(selected, path) ? <HighlightComponent>{children}</HighlightComponent> : children)}
  </IdeContext.Consumer>
);
