import * as _ from "lodash";
import { IdeContext } from "../../../Ide/Ide";
import { AstViewState } from "../../../modules/AstView/state";
import { arg } from "../../Argument/Argument";
import { KeyboardCommand } from "../../KeyboardCommands/KeyboardCommand";
import { ref, ReferenceKind } from "../../Reference/Reference";
import { abs } from "../Abstraction";

export class InsertReferenceAsHeadAbstractionKeyboardCommand extends KeyboardCommand {
  public isActive({ selected, ast }: AstViewState) {
    const selectedAst = _.get(ast, selected, ast);
    return selectedAst.kind === ReferenceKind;
  }
  public key = { key: "\\", ctrl: false, shift: false };
  public render() {
    return "abstraction";
  }
  public action({ state, dispatch, actions: { replace, select } }: IdeContext) {
    const { selected, ast } = state;
    dispatch([
      replace({ path: selected, ast: abs(arg(_.get(ast, selected, ast).name), ref("")) }),
      select({ path: selected.concat("body") })
    ]);
  }
}
