import * as _ from "lodash";
import { IdeContext } from "../../../Ide/Ide";
import { AstViewState } from "../../../modules/AstView/state";
import { AbstractionKind } from "../../Abstraction/Abstraction";
import { KeyboardCommand } from "../../KeyboardCommands/KeyboardCommand";
import { ref, ReferenceKind } from "../../Reference/Reference";
import { app, ApplicationKind } from "../Application";

export class InsertIntoRightApplicationKeyboardCommand extends KeyboardCommand {
  public isActive({ selected, ast }: AstViewState) {
    const selectedAst = _.get(ast, selected, ast);
    return [ReferenceKind, ApplicationKind, AbstractionKind].includes(selectedAst.kind);
  }
  public key = { key: " ", ctrl: true, shift: false };
  public render() {
    return "application";
  }
  public action({ state: { selected, ast }, dispatch, actions: { replace, select } }: IdeContext) {
    const selectedAst = _.get(ast, selected, ast);
    dispatch([replace({ path: selected, ast: app(selectedAst, ref("")) }), select({ path: selected.concat("right") })]);
  }
}
