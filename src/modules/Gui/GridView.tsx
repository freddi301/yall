import * as React from "react";
import { ModuleExportsContext } from "../ModuleLoader/ModuleLoaderContainer";
import { Cell } from "./Cell";
import { CellView } from "./CellView";
import { Grid } from "./Grid";

export type GridViewLayout = Array<{ width: number; height: number; name: string; x: number; y: number }>;

export const GridView = ({ layout }: { layout: GridViewLayout }) => (
  <Grid>
    <ModuleExportsContext.Consumer>
      {moduleExports => {
        const cellViews = moduleExports.filter(item => item instanceof CellView);
        warnOnDuplicates(cellViews);
        return layout.map(({ width, height, name, x, y }, index) => (
          <Cell key={name} x={x} y={y} width={width} height={height}>
            {(cellViews.find(cellView => cellView.name === name) || emptyCellView).view}
          </Cell>
        ));
      }}
    </ModuleExportsContext.Consumer>
  </Grid>
);

const emptyCellView = new class extends CellView {
  public name: "";
  public view: "Empty";
}();

const warnOnDuplicates = (cellViews: CellView[]) => {
  const occurrencs: { [index: string]: CellView[] } = {};
  for (const cellView of cellViews) {
    if (!occurrencs[cellView.name]) {
      occurrencs[cellView.name] = [];
    }
    occurrencs[cellView.name].push(cellView);
  }
  for (const [name, occurs] of Object.entries(occurrencs)) {
    if (occurs.length > 1) {
      console.group("Duplicate cell views for name: ", name); //tslint:disable-line
      occurs.forEach(cellView => console.log(cellView)); //tslint:disable-line
      console.groupEnd(); //tslint:disable-line
    }
  }
};
