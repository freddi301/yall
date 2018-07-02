import * as React from "react";
import { IdeContext } from "../../../Ide/Ide";
import { IdeState } from "../../../Ide/state";
import { arg } from "../../Argument/Argument";
import { ref } from "../../Reference/Reference";
import { VisualCommand } from "../../VisualCommands/VisualCommand";
import { abs } from "../Abstraction";

export class InsertInPlaceAbstractionVisualCommand extends VisualCommand {
  public isActive(state: IdeState) {
    return true;
  }
  public render({ state: { selected }, dispatch, actions: { replace } }: IdeContext) {
    return <button onClick={() => dispatch([replace({ path: selected, ast: abs(arg("_"), ref("_")) })])}>abstraction</button>;
  }
}
