import * as React from 'react';
import { ObservableView } from '../components/ObservableView';
import { Grid } from '../Gui/Grid';
import { Widget } from '../Gui/Widget';
import { AstViewFactory } from '../modules/AstView/AstView';
import { Export } from '../modules/ImportExport/Export';
import { Import } from '../modules/ImportExport/Import';
import { KeyboardCommands, KeyboardCommandsSuggestions } from '../modules/KeyboardCommands/KeyboardCommands';
import { VisualCommands } from '../modules/VisualCommands/VisualCommands';
import { defaultAstViewMiddlewares } from './default/astViewMiddlewares';
import { defaultKeyboardCommands } from './default/keyboardCommands';
import { defaultVisualCommands } from './default/visualCommands';
import { PathComponent } from './PathComponent';
import { actions, IdeState, reducer } from './state';

export type IdeContext = { state: IdeState; dispatch: (actions: any[] /* TODO: fix type*/) => Promise<void>; actions: typeof actions };

export const IdeContext = React.createContext<IdeContext>({
  state: { selected: [], ast: { kind: 'empty' } },
  dispatch: async () => {
    return;
  },
  actions
});

const AstView = AstViewFactory({ middlewares: defaultAstViewMiddlewares });

export const Ide: ObservableView<IdeState> = ({ value: state, update }) => {
  const { ast, selected } = state;
  const context: IdeContext = { state, actions, dispatch: acts => update(acts.reduce(reducer, state)) };
  return (
    <IdeContext.Provider value={context}>
      <Grid>
        <Widget key="Extra" heading="Extra" data-grid={{ x: 10, y: 0, w: 2, h: 5 }}>
          <Export />
          <Import />
        </Widget>
        <Widget
          key="AstView"
          heading={
            <span>
              Ast View <PathComponent path={selected} onSelect={({ path }) => context.dispatch([context.actions.select({ path })])} />
            </span>
          }
          data-grid={{ w: 8, x: 0, y: 0, h: 5 }}
        >
          <KeyboardCommands keyboardCommands={defaultKeyboardCommands}>
            <AstView ast={ast} path={[]} />
          </KeyboardCommands>
        </Widget>
        <Widget key="KeyboardCommandsSuggestions" heading="Keyboard Commands Suggestions" data-grid={{ w: 2, x: 8, y: 0, h: 2 }}>
          <KeyboardCommandsSuggestions keyboardCommands={defaultKeyboardCommands} />
        </Widget>
        <Widget key="VisualCommands" heading="Visual Commands" data-grid={{ w: 2, x: 8, y: 2, h: 3 }}>
          <VisualCommands visualCommands={defaultVisualCommands} />
        </Widget>
      </Grid>
    </IdeContext.Provider>
  );
};
