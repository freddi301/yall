import * as React from 'react';
import { ObservableView } from '../components/ObservableView';
import { Ast, AstPath, EventDispatch, eventDispatchNop } from '../Ide/AstView/AstInterpreter';
import { Path } from '../Ide/Path';
import { VisualCommands } from '../Ide/VisualCommands/VisualCommands';
import { astView } from './default/astView';
import { defaultKeyboardCommands } from './default/keyboardCommands';
import { defaultVisualCommands } from './default/visualCommands';
import { KeyboardCommands, KeyboardCommandsSuggestions } from './KeyboardCommands/KeyboardCommands';
import { actions, IdeState, reducer } from './state';

export type IdeControl = { state: IdeState; update: (state: IdeState) => Promise<void> };

export type IdeContext = { state: IdeState; dispatch: (actions: any[] /*fix type*/) => Promise<void>; actions: typeof actions };

export const IdeContext = React.createContext<IdeContext>({
  state: { selected: [], ast: { kind: 'empty' } },
  dispatch: async () => {
    return;
  },
  actions
});

export const Ide: ObservableView<IdeState> = ({ value: state, update }) => {
  const { ast, selected } = state;
  const eventDispatch: EventDispatch = {
    ...eventDispatchNop,
    select(args: { path: AstPath }) {
      update(reducer(state, actions.select(args)));
    },
    replace(args: { path: AstPath; ast: Ast }) {
      update(reducer(state, actions.replace(args)));
    }
  };
  const AstView = astView(state);
  const provide: IdeContext = { state, actions, dispatch: acts => update(acts.reduce(reducer, state)) };
  return (
    <IdeContext.Provider value={provide}>
      <Path path={selected} onSelect={eventDispatch.select} />
      <KeyboardCommands state={state} update={update} keyboardCommands={defaultKeyboardCommands}>
        <AstView ast={ast} path={[]} eventDispatch={eventDispatch} view={AstView} />
      </KeyboardCommands>
      <KeyboardCommandsSuggestions state={state} update={update} keyboardCommands={defaultKeyboardCommands} />
      <VisualCommands visualCommands={defaultVisualCommands} />
    </IdeContext.Provider>
  );
};
