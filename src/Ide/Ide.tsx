import * as React from 'react';
import { KeepFocus } from '../components/KeepFocus';
import { ObservableView } from '../components/ObservableView';
import { Ast, AstPath, EventDispatch, eventDispatchNop } from '../Ide/AstView/AstInterpreter';
import { Suggestions } from '../Ide/KeyboardCommands/Suggestion';
import { Path } from '../Ide/Path';
import { VisualCommands } from '../Ide/VisualCommands/VisualCommands';
import * as actions from './actions';
import { astView } from './default/astView';
import { dafaultVisualCommands } from './default/visualCommands';
import { KeyboardCommands } from './KeyboardCommands/KeyboardCommands';
import { IdeState } from './state';

export type IdeControl = { state: IdeState; update: (state: IdeState) => Promise<void> };

export const Ide: ObservableView<IdeState> = ({ value: ideState, update }) => {
  const { ast, selected } = ideState;
  const up = (action: (ideState: IdeState) => IdeState) => update(action(ideState));
  const eventDispatch: EventDispatch = {
    ...eventDispatchNop,
    select(args: { path: AstPath }) {
      up(actions.select(args));
    },
    replace(args: { path: AstPath; ast: Ast }) {
      up(actions.replace(args));
    }
  };
  const AstView = astView(ideState);
  return (
    <>
      <div>
        <Path path={selected} onSelect={eventDispatch.select} />
        <br />
        <KeyboardCommands ast={ast} selected={selected} eventDispatch={eventDispatch}>
          <KeepFocus>
            <AstView ast={ast} path={[]} eventDispatch={eventDispatch} view={AstView} />
          </KeepFocus>
        </KeyboardCommands>
        <Suggestions />
        <VisualCommands state={ideState} update={update} visualCommands={dafaultVisualCommands} />
      </div>
    </>
  );
};
