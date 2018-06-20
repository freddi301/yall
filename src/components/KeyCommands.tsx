import * as _ from 'lodash';
import * as React from 'react';
import { IdeState } from '../Ide/state';
import * as Abstraction from './Abstraction';
import * as Application from './Application';
import * as Argument from './Argument';
import { EventDispatch } from './AstInterpreter';
import * as Reference from './Reference';

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
