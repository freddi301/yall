import * as React from 'react';
import { Grid, Widget } from '../components/Grid';
import { ObservableView } from '../components/ObservableView';
import { VisualCommands } from '../Ide/VisualCommands/VisualCommands';
import { AstViewFactory } from './AstView/AstView';
import { defaultAstViewMiddlewares } from './default/astViewMiddlewares';
import { defaultKeyboardCommands } from './default/keyboardCommands';
import { defaultVisualCommands } from './default/visualCommands';
import { KeyboardCommands, KeyboardCommandsSuggestions } from './KeyboardCommands/KeyboardCommands';
import { PathComponent } from './PathComponent';
import { actions, IdeState, reducer } from './state';

export type IdeContext = { state: IdeState; dispatch: (actions: any[] /*fix type*/) => Promise<void>; actions: typeof actions };

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
        <Widget
          key="AstView"
          heading={
            <span>
              Ast View <PathComponent path={selected} onSelect={({ path }) => context.dispatch([context.actions.select({ path })])} />
            </span>
          }
          data-grid={{ w: 4, x: 0, y: 0, h: 1 }}
        >
          <KeyboardCommands keyboardCommands={defaultKeyboardCommands}>
            <AstView ast={ast} path={[]} />
          </KeyboardCommands>
        </Widget>
        <Widget key="KeyboardCommandsSuggestions" heading="Keyboard Commands Suggestions" data-grid={{ w: 1, x: 4, y: 0, h: 1 }}>
          <KeyboardCommandsSuggestions keyboardCommands={defaultKeyboardCommands} />
        </Widget>
        <Widget key="VisualCommands" heading="Visual Commands" data-grid={{ w: 1, x: 5, y: 0, h: 1 }}>
          <VisualCommands visualCommands={defaultVisualCommands} />
        </Widget>
      </Grid>
    </IdeContext.Provider>
  );
};
