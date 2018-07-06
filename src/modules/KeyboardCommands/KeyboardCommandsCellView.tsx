import * as React from "react";
import { CellView } from "../Gui/CellView";
import { ModuleExportsContext } from "../ModuleLoader/ModuleLoaderContainer";
import { KeyboardCommand } from "./KeyboardCommand";
import { KeyboardCommandsSuggestions } from "./KeyboardCommands";

export class KeyboardCommandsCellView extends CellView {
  public name = "KeyboardCommands";
  public view = (
    <ModuleExportsContext.Consumer>
      {moduleExports => {
        const keyboardCommands = moduleExports.filter(item => item instanceof KeyboardCommand);
        return <KeyboardCommandsSuggestions keyboardCommands={keyboardCommands} />;
      }}
    </ModuleExportsContext.Consumer>
  );
}
