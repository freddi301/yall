import * as React from "react";
import { IdeContext } from "../../Ide/Ide";
import { IdeState } from "../../Ide/state";

export abstract class KeyboardCommand {
  public abstract isActive(ideState: IdeState): boolean;
  public abstract render(ideContext: IdeState): React.ReactNode;
  public abstract matchKeys(event: React.KeyboardEvent<HTMLElement>): boolean;
  public abstract action(context: IdeContext): void;
}
