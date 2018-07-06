import * as React from "react";
import { IdeContext } from "../../Ide/Ide";
import { Export } from "../AstView/Export";
import { Import } from "../AstView/Import";
import { CellView } from "../Gui/CellView";
import { KeyboardCommand } from "../KeyboardCommands/KeyboardCommand";
import { KeyboardCommandsCapture } from "../KeyboardCommands/KeyboardCommands";
import { ModuleExportsContext } from "../ModuleLoader/ModuleLoaderContainer";
import { AstViewFactory } from "./AstView";
import { defaultAstViewMiddlewares } from "./astViewMiddlewares";
import { PathComponent } from "./PathComponent";

const AstView = AstViewFactory({ middlewares: defaultAstViewMiddlewares });

export class AstViewCellView extends CellView {
  public name = "AstView";
  public view = (
    <ModuleExportsContext.Consumer>
      {moduleExports => (
        <IdeContext.Consumer>
          {({ state: { ast, selected }, actions, dispatch }) => (
            <>
              <PathComponent path={selected} onSelect={({ path }) => dispatch([actions.select({ path })])} />
              <Import />
              <Export />
              <KeyboardCommandsCapture keyboardCommands={moduleExports.filter(item => item instanceof KeyboardCommand)}>
                <AstView ast={ast} path={[]} />
              </KeyboardCommandsCapture>
            </>
          )}
        </IdeContext.Consumer>
      )}
    </ModuleExportsContext.Consumer>
  );
}
