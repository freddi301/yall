import * as _ from "lodash";
import { IdeContext } from "../../../Ide/Ide";
import { IdeState } from "../../../Ide/state";
import { kind as abstractionKind } from "../../Abstraction/Abstraction";
import { kind as applicationKind } from "../../Application/Application";
import { KeyboardCommand } from "../../KeyboardCommands/KeyboardCommand";
import { kind as referenceKind, ref } from "../../Reference/Reference";

export class InsertInPlaceReferenceKeyboardCommand extends KeyboardCommand {
  public isActive({ selected, ast }: IdeState) {
    const selectedAst = _.get(ast, selected, ast);
    return [referenceKind, applicationKind, abstractionKind].includes(selectedAst.kind);
  }
  public key = { key: "r", ctrl: false, shift: false };
  public render() {
    return "reference";
  }
  public action({ state, dispatch, actions: { replace } }: IdeContext) {
    const { selected } = state;
    dispatch([replace({ path: selected, ast: ref("") })]);
  }
}
