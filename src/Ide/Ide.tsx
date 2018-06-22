import * as React from 'react';
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
      <PathComponent path={selected} onSelect={({ path }) => context.dispatch([context.actions.select({ path })])} />
      <KeyboardCommands keyboardCommands={defaultKeyboardCommands}>
        <AstView ast={ast} path={[]} />
      </KeyboardCommands>
      <KeyboardCommandsSuggestions keyboardCommands={defaultKeyboardCommands} />
      <VisualCommands visualCommands={defaultVisualCommands} />
    </IdeContext.Provider>
  );
};
