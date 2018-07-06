import * as React from "react";
import { CellView } from "../Gui/CellView";
import { AddModule } from "./components/AddModule";
import { ModuleList } from "./components/ModuleList";

export class ModuleLoaderCellView extends CellView {
  public name = "ModuleLoader";
  public view = (
    <>
      <AddModule />
      <ModuleList />
    </>
  );
}
