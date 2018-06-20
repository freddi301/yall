import * as _ from 'lodash';
import * as React from 'react';
import { IdeState } from '../Ide/state';
import * as Abstraction from '../plugins/Abstraction/Abstraction';
import * as Application from '../plugins/Application/Application';
import * as Argument from '../plugins/Argument/Argument';
import * as Reference from '../plugins/Reference/Reference';
import { EventDispatch } from './AstInterpreter';

type KeyCommandsArgs = IdeState & { eventDispatch: EventDispatch };

const keyCommand = ({ selected, ast, eventDispatch }: KeyCommandsArgs) => (e: React.KeyboardEvent<HTMLElement>) => {
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

export const KeyCommands: React.StatelessComponent<KeyCommandsArgs> = ({ children, selected, ast, eventDispatch }) => (
  <div onKeyPress={keyCommand({ selected, ast, eventDispatch })}>{children}</div>
);
