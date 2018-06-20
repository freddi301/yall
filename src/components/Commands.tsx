import * as React from 'react';
import * as Abstraction from './Abstraction';
import * as Application from './Application';
import * as Argument from './Argument';
import { EventDispatch } from './AstInterpreter';
import { IdeState } from './Ide';
import * as Reference from './Reference';

type CommandsArgs = IdeState & { eventDispatch: EventDispatch };

export const Commands: React.StatelessComponent<CommandsArgs> = ({ selected, eventDispatch }) => (
  <div>
    <button onClick={() => eventDispatch.replace({ path: selected, ast: Abstraction.abs(Argument.arg('_'), Reference.ref('_')) })}>
      abstraction
    </button>
    <button onClick={() => eventDispatch.replace({ path: selected, ast: Application.app(Reference.ref('_'), Reference.ref('_')) })}>
      application
    </button>
    <button onClick={() => eventDispatch.replace({ path: selected, ast: Reference.ref('_') })}>reference</button>
  </div>
);
