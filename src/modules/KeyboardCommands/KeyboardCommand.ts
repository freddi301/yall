import * as React from "react";
import { IdeContext } from "../../Ide/Ide";
import { IdeState } from "../../Ide/state";

export type KeyCombo = { key: string; ctrl: boolean; shift: boolean };

export abstract class KeyboardCommand {
  public abstract isActive(ideState: IdeState): boolean;
  public abstract render(ideContext: IdeState): React.ReactNode;
  public abstract key: KeyCombo;
  public abstract action(context: IdeContext): void;
}
