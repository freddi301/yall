import * as React from "react";
import { IdeContext } from "../../../Ide/Ide";
import { IdeState } from "../../../Ide/state";
import { ref } from "../../Reference/Reference";
import { VisualCommand } from "../../VisualCommands/VisualCommand";
import { app } from "../Application";

export class InsertInPlaceApplicationVisualCommand extends VisualCommand {
  public isActive(state: IdeState) {
    return true;
  }
  public render({ state: { selected }, dispatch, actions: { replace } }: IdeContext) {
    return <button onClick={() => dispatch([replace({ path: selected, ast: app(ref(""), ref("")) })])}>application</button>;
  }
}
