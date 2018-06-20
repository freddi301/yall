import * as React from 'react';
import * as Abstraction from '../../plugins/Abstraction/Abstraction';
import * as Application from '../../plugins/Application/Application';
import * as Argument from '../../plugins/Argument/Argument';
import * as Reference from '../../plugins/Reference/Reference';
import { EventDispatch } from '../AstView/AstInterpreter';
import { IdeState } from '../state';

type VisualCommandsArgs = IdeState & { eventDispatch: EventDispatch };

export const VisualCommands: React.StatelessComponent<VisualCommandsArgs> = ({ selected, eventDispatch }) => (
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
