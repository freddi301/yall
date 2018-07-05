import * as React from "react";
import { IdeContext } from "../../../Ide/Ide";
import { AstViewState } from "../../../modules/AstView/state";
import { arg } from "../../Argument/Argument";
import { ref } from "../../Reference/Reference";
import { VisualCommand } from "../../VisualCommands/VisualCommand";
import { abs } from "../Abstraction";

export class InsertInPlaceAbstractionVisualCommand extends VisualCommand {
  public isActive(state: AstViewState) {
    return true;
  }
  public render({ state: { selected }, dispatch, actions: { replace } }: IdeContext) {
    return <button onClick={() => dispatch([replace({ path: selected, ast: abs(arg(""), ref("")) })])}>abstraction</button>;
  }
}
