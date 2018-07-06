import * as React from "react";
import { ObservableView } from "../components/ObservableView";
import { actions, AstViewState, reducer } from "../modules/AstView/state";
import { GridView, GridViewLayout } from "../modules/Gui/GridView";
import { ModuleLoader } from "../modules/ModuleLoader/ModuleLoaderContainer";

export type IdeContext = { state: AstViewState; dispatch: (actions: any[] /* TODO: fix type*/) => Promise<void>; actions: typeof actions };

export const IdeContext = React.createContext<IdeContext>(null as any); // null as any is meant to break app when no context provided

export const Ide: ObservableView<AstViewState> = ({ value: state, update }) => {
  const context: IdeContext = { state, actions, dispatch: acts => update(acts.reduce(reducer, state)) };
  return (
    <IdeContext.Provider value={context}>
      <ModuleLoader initialModules={initialModules}>
        <GridView layout={layout} />
      </ModuleLoader>
    </IdeContext.Provider>
  );
};

// TODO: replace with loadable conf file

const initialModules = ["Reference", "Application", "Abstraction", "AstView", "VisualCommands", "KeyboardCommands", "ModuleLoader"];

const layout: GridViewLayout = [
  { name: "AstView", x: 1, y: 1, width: 6, height: 5 },
  { name: "KeyboardCommands", x: 7, y: 1, width: 2, height: 1 },
  { name: "VisualCommands", x: 7, y: 2, width: 2, height: 4 },
  { name: "ModuleLoader", x: 9, y: 1, width: 1, height: 5 }
];
