import * as _ from "lodash";
import * as React from "react";
import { Key } from "../../../components/Key";
import { IdeContext } from "../../../Ide/Ide";
import { IdeState } from "../../../Ide/state";
import { arg } from "../../Argument/Argument";
import { KeyboardCommand } from "../../KeyboardCommands/KeyboardCommand";
import { ref, ReferenceKind } from "../../Reference/Reference";
import { abs } from "../Abstraction";

export class InsertReferenceAsHeadAbstractionKeyboardCommand extends KeyboardCommand {
  public isActive({ selected, ast }: IdeState) {
    const selectedAst = _.get(ast, selected, ast);
    return selectedAst.kind === ReferenceKind;
  }
  public matchKeys({ key }: React.KeyboardEvent<HTMLElement>) {
    return key === "\\";
  }
  public render() {
    return (
      <div>
        <Key>\</Key> abstraction
      </div>
    );
  }
  public action({ state, dispatch, actions: { replace, select } }: IdeContext) {
    const { selected, ast } = state;
    dispatch([
      replace({ path: selected, ast: abs(arg(_.get(ast, selected, ast).name), ref("")) }),
      select({ path: selected.concat("body") })
    ]);
  }
}
