import * as _ from "lodash";
import * as React from "react";
import { Key } from "../../../components/Key";
import { IdeContext } from "../../../Ide/Ide";
import { IdeState } from "../../../Ide/state";
import { AbstractionKind } from "../../Abstraction/Abstraction";
import { KeyboardCommand } from "../../KeyboardCommands/KeyboardCommand";
import { ref, ReferenceKind } from "../../Reference/Reference";
import { app, ApplicationKind } from "../Application";

export class InsertToRightApplicationKeyboardCommand extends KeyboardCommand {
  public isActive({ selected, ast }: IdeState) {
    const selectedAst = _.get(ast, selected, ast);
    return [ReferenceKind, ApplicationKind, AbstractionKind].includes(selectedAst.kind);
  }
  public matchKeys({ key }: React.KeyboardEvent<HTMLElement>) {
    return key === " ";
  }
  public render() {
    return (
      <div>
        <Key>&nbsp;</Key> application
      </div>
    );
  }
  public action({ state: { selected, ast }, dispatch, actions: { replace, select } }: IdeContext) {
    const selectedAst = _.get(ast, selected, ast);
    const outerPath = selected.slice(0, -1);
    const outerAst = _.get(ast, outerPath, ast);
    const outerAstIsApplication = outerAst.kind === ApplicationKind;
    const lastPath = selected[selected.length - 1];
    const selectedIsRightSide = lastPath === "right";
    const insertToRight = outerAstIsApplication && selectedIsRightSide;
    if (insertToRight) {
      dispatch([replace({ path: outerPath, ast: app(outerAst, ref("")) }), select({ path: outerPath.concat("right") })]);
    } else {
      dispatch([replace({ path: selected, ast: app(selectedAst, ref("")) }), select({ path: selected.concat("right") })]);
    }
  }
}
