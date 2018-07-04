import * as React from "react";
import { ObservableView } from "../components/ObservableView";
import { AstViewFactory } from "../modules/AstView/AstView";
import { Cell } from "../modules/Gui/Cell";
import { Grid } from "../modules/Gui/Grid";
import { Export } from "../modules/ImportExport/Export";
import { Import } from "../modules/ImportExport/Import";
import { KeyboardCommands, KeyboardCommandsSuggestions } from "../modules/KeyboardCommands/KeyboardCommands";
import { ModuleLoaderComponent } from "../modules/ModuleLoader/ModuleLoaderComponent";
import { ModuleExportsContext, ModuleLoader } from "../modules/ModuleLoader/ModuleLoaderContainer";
import { VisualCommand } from "../modules/VisualCommands/VisualCommand";
import { VisualCommands } from "../modules/VisualCommands/VisualCommands";
import { defaultAstViewMiddlewares } from "./default/astViewMiddlewares";
import { defaultKeyboardCommands } from "./default/keyboardCommands";
import { defaultLoadedModules } from "./default/loadedModules";
import { PathComponent } from "./PathComponent";
import { actions, IdeState, reducer } from "./state";

export type IdeContext = { state: IdeState; dispatch: (actions: any[] /* TODO: fix type*/) => Promise<void>; actions: typeof actions };

export const IdeContext = React.createContext<IdeContext>(null as any); // null as any is meant to break app when no context provided

const AstView = AstViewFactory({ middlewares: defaultAstViewMiddlewares });

export const Ide: ObservableView<IdeState> = ({ value: state, update }) => {
  const { ast, selected } = state;
  const context: IdeContext = { state, actions, dispatch: acts => update(acts.reduce(reducer, state)) };
  return (
    <IdeContext.Provider value={context}>
      <ModuleLoader initialModules={defaultLoadedModules}>
        <Grid>
          <Cell key="Extra" heading="Extra">
            <Export />
            <Import />
            <ModuleLoaderComponent />
          </Cell>
          <Cell
            key="AstView"
            heading={
              <span>
                Ast View <PathComponent path={selected} onSelect={({ path }) => context.dispatch([context.actions.select({ path })])} />
              </span>
            }
          >
            <KeyboardCommands keyboardCommands={defaultKeyboardCommands}>
              <AstView ast={ast} path={[]} />
            </KeyboardCommands>
          </Cell>
          <Cell key="KeyboardCommandsSuggestions" heading="Keyboard Commands Suggestions">
            <KeyboardCommandsSuggestions keyboardCommands={defaultKeyboardCommands} />
          </Cell>
          <Cell key="VisualCommands" heading="Visual Commands">
            <ModuleExportsContext.Consumer>
              {moduleExports => {
                const visualCommands = moduleExports.filter(item => item instanceof VisualCommand);
                return <VisualCommands visualCommands={visualCommands} />;
              }}
            </ModuleExportsContext.Consumer>
          </Cell>
        </Grid>
      </ModuleLoader>
    </IdeContext.Provider>
  );
};
