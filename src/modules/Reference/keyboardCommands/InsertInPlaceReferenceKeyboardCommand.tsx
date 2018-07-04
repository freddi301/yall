import * as _ from "lodash";
import * as React from "react";
import { Key } from "../../../components/Key";
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
  public matchKeys({ key }: React.KeyboardEvent<HTMLElement>) {
    return key === "r";
  }
  public render() {
    return (
      <div>
        <Key>r</Key> reference
      </div>
    );
  }
  public action({ state, dispatch, actions: { replace } }: IdeContext) {
    const { selected } = state;
    dispatch([replace({ path: selected, ast: ref("") })]);
  }
}
