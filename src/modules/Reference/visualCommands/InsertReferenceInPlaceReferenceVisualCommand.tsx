import * as React from "react";
import { IdeContext } from "../../../Ide/Ide";
import { IdeState } from "../../../Ide/state";
import { VisualCommand } from "../../VisualCommands/VisualCommand";
import { ref } from "../Reference";

export class InsertReferenceInPlaceReferenceVisualCommand extends VisualCommand {
  public isActive(state: IdeState) {
    return true;
  }
  public render({ state: { selected }, dispatch, actions: { replace } }: IdeContext) {
    return <button onClick={() => dispatch([replace({ path: selected, ast: ref("") })])}>reference</button>;
  }
}
