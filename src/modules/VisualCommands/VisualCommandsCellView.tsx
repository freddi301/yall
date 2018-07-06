import * as React from "react";
import { CellView } from "../Gui/CellView";
import { ModuleExportsContext } from "../ModuleLoader/ModuleLoaderContainer";
import { VisualCommand } from "./VisualCommand";
import { VisualCommands } from "./VisualCommands";

export class VisualCommandsCellView extends CellView {
  public name = "VisualCommands";
  public view = (
    <ModuleExportsContext.Consumer>
      {moduleExports => {
        const visualCommands = moduleExports.filter(item => item instanceof VisualCommand);
        return <VisualCommands visualCommands={visualCommands} />;
      }}
    </ModuleExportsContext.Consumer>
  );
}
