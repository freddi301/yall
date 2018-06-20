import * as _ from 'lodash';
import * as React from 'react';
import * as Abstraction from '../../plugins/Abstraction/Abstraction';
import * as Application from '../../plugins/Application/Application';
import * as Argument from '../../plugins/Argument/Argument';
import * as Reference from '../../plugins/Reference/Reference';
import { EventDispatch } from '../AstView/AstInterpreter';
import { IdeState } from '../state';

type KeyboardCommandsArgs = IdeState & { eventDispatch: EventDispatch };

const keyCommand = ({ selected, ast, eventDispatch }: KeyboardCommandsArgs) => (e: React.KeyboardEvent<HTMLElement>) => {
  const selectedAst = _.get(ast, selected, ast);
  if (e.key === '\\' && selectedAst.kind === Reference.kind) {
    // TODO: focus on body
    eventDispatch.replace({ path: selected, ast: Abstraction.abs(Argument.arg(_.get(ast, selected, ast).name), Reference.ref('_')) });
  } else if (
    e.key === ' ' &&
    (selectedAst.kind === Reference.kind || selectedAst.kind === Abstraction.kind || selectedAst.kind === Application.kind)
  ) {
    // TODO: focus on right
    eventDispatch.replace({ path: selected, ast: Application.app(selectedAst, Reference.ref('_')) });
  } else if (
    e.key === 'r' &&
    (selectedAst.kind === Reference.kind || selectedAst.kind === Abstraction.kind || selectedAst.kind === Application.kind)
  ) {
    eventDispatch.replace({ path: selected, ast: Reference.ref('_') });
  }
};

export const KeyboardCommands: React.StatelessComponent<KeyboardCommandsArgs> = ({ children, selected, ast, eventDispatch }) => (
  <div onKeyPress={keyCommand({ selected, ast, eventDispatch })}>{children}</div>
);
