import * as React from 'react';
import { IdeState } from '../Ide/state';
import * as Abstraction from '../plugins/Abstraction/Abstraction';
import * as Application from '../plugins/Application/Application';
import * as Argument from '../plugins/Argument/Argument';
import * as Reference from '../plugins/Reference/Reference';
import { EventDispatch } from './AstInterpreter';

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
