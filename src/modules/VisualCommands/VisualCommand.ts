import * as React from "react";
import { IdeContext } from "../../Ide/Ide";
import { IdeState } from "../../Ide/state";

export abstract class VisualCommand {
  public abstract isActive(ideState: IdeState): boolean;
  public abstract render(context: IdeContext): React.ReactNode;
}
