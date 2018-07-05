import * as React from "react";
import { ObservableView } from "../components/ObservableView";
import { AstViewFactory } from "../modules/AstView/AstView";
import { defaultAstViewMiddlewares } from "../modules/AstView/astViewMiddlewares";
import { PathComponent } from "../modules/AstView/PathComponent";
import { actions, AstViewState, reducer } from "../modules/AstView/state";
import { Cell } from "../modules/Gui/Cell";
import { Grid } from "../modules/Gui/Grid";
import { Export } from "../modules/ImportExport/Export";
import { Import } from "../modules/ImportExport/Import";
import { KeyboardCommand } from "../modules/KeyboardCommands/KeyboardCommand";
import { KeyboardCommandsCapture, KeyboardCommandsSuggestions } from "../modules/KeyboardCommands/KeyboardCommands";
import { AddModule } from "../modules/ModuleLoader/components/AddModule";
import { ModuleList } from "../modules/ModuleLoader/components/ModuleList";
import { ModuleExportsContext, ModuleLoader } from "../modules/ModuleLoader/ModuleLoaderContainer";
import { VisualCommand } from "../modules/VisualCommands/VisualCommand";
import { VisualCommands } from "../modules/VisualCommands/VisualCommands";

export type IdeContext = { state: AstViewState; dispatch: (actions: any[] /* TODO: fix type*/) => Promise<void>; actions: typeof actions };

export const IdeContext = React.createContext<IdeContext>(null as any); // null as any is meant to break app when no context provided

const AstView = AstViewFactory({ middlewares: defaultAstViewMiddlewares });

export const Ide: ObservableView<AstViewState> = ({ value: state, update }) => {
  const { ast, selected } = state;
  const context: IdeContext = { state, actions, dispatch: acts => update(acts.reduce(reducer, state)) };
  return (
    <IdeContext.Provider value={context}>
      <ModuleLoader initialModules={["Reference", "Application", "Abstraction"]}>
        <Grid>
          <Cell key="Extra">
            <Export />
            <Import />
            <AddModule />
            <ModuleList />
          </Cell>
          <Cell key="AstView">
            <ModuleExportsContext.Consumer>
              {moduleExports => {
                const keyboardCommands = moduleExports.filter(item => item instanceof KeyboardCommand);
                return (
                  <KeyboardCommandsCapture keyboardCommands={keyboardCommands}>
                    <PathComponent path={selected} onSelect={({ path }) => context.dispatch([context.actions.select({ path })])} />
                    <br />
                    <AstView ast={ast} path={[]} />
                  </KeyboardCommandsCapture>
                );
              }}
            </ModuleExportsContext.Consumer>
          </Cell>
          <Cell key="KeyboardCommandsSuggestions">
            <ModuleExportsContext.Consumer>
              {moduleExports => {
                const keyboardCommands = moduleExports.filter(item => item instanceof KeyboardCommand);
                return <KeyboardCommandsSuggestions keyboardCommands={keyboardCommands} />;
              }}
            </ModuleExportsContext.Consumer>
          </Cell>
          <Cell key="VisualCommands">
            <ModuleExportsContext.Consumer>
              {moduleExports => {
                const visualCommands = moduleExports.filter(item => item instanceof VisualCommand);
                return <VisualCommands visualCommands={visualCommands} />;
              }}
            </ModuleExportsContext.Consumer>
          </Cell>
          <Cell />
        </Grid>
      </ModuleLoader>
    </IdeContext.Provider>
  );
};
