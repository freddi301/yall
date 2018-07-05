import * as React from "react";
import { IdeContext } from "../../Ide/Ide";
import { AstViewState } from "../../modules/AstView/state";

export type KeyCombo = { key: string; ctrl: boolean; shift: boolean };

export abstract class KeyboardCommand {
  public abstract isActive(ideState: AstViewState): boolean;
  public abstract render(ideContext: AstViewState): React.ReactNode;
  public abstract key: KeyCombo;
  public abstract action(context: IdeContext): void;
}
