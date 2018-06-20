import * as React from 'react';
import { Ast, AstPath, EventDispatch, eventDispatchNop } from '../components/AstInterpreter';
import { Commands } from '../components/Commands';
import { KeepFocus } from '../components/KeepFocus';
import { KeyCommands } from '../components/KeyCommands';
import { Path } from '../components/Path';
import { Suggestions } from '../components/Suggestion';
import { ObservableView } from '../util/ObservableView';
import * as actions from './actions';
import { astView } from './astView';
import { IdeState } from './state';

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
        <KeyCommands ast={ast} selected={selected} eventDispatch={eventDispatch}>
          <KeepFocus>
            <AstView ast={ast} path={[]} eventDispatch={eventDispatch} view={AstView} />
          </KeepFocus>
        </KeyCommands>
        <Suggestions />
        <Commands ast={ast} selected={selected} eventDispatch={eventDispatch} />
      </div>
    </>
  );
};