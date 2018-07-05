import * as React from "react";
import { IdeContext } from "../../Ide/Ide";
import { AstViewState } from "../../modules/AstView/state";

export abstract class VisualCommand {
  public abstract isActive(ideState: AstViewState): boolean;
  public abstract render(context: IdeContext): React.ReactNode;
}
