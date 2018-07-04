import * as _ from "lodash";
import * as React from "react";
import { Key } from "../../../components/Key";
import { IdeContext } from "../../../Ide/Ide";
import { IdeState } from "../../../Ide/state";
import { AbstractionKind } from "../../Abstraction/Abstraction";
import { KeyboardCommand } from "../../KeyboardCommands/KeyboardCommand";
import { ref, ReferenceKind } from "../../Reference/Reference";
import { app, ApplicationKind } from "../Application";

export class InsertIntoRightApplicationKeyboardCommand extends KeyboardCommand {
  public isActive({ selected, ast }: IdeState) {
    const selectedAst = _.get(ast, selected, ast);
    return [ReferenceKind, ApplicationKind, AbstractionKind].includes(selectedAst.kind);
  }
  public matchKeys({ key, ctrlKey }: React.KeyboardEvent<HTMLElement>) {
    return key === " " && ctrlKey;
  }
  public render() {
    return (
      <div>
        <Key>ctrl</Key>+<Key>&nbsp;</Key> application
      </div>
    );
  }
  public action({ state: { selected, ast }, dispatch, actions: { replace, select } }: IdeContext) {
    const selectedAst = _.get(ast, selected, ast);
    dispatch([replace({ path: selected, ast: app(selectedAst, ref("")) }), select({ path: selected.concat("right") })]);
  }
}
