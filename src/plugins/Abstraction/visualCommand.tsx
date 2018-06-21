import * as React from 'react';
import { VisualCommand } from '../../Ide/VisualCommands/VisualCommand';
import { arg } from '../Argument/Argument';
import { ref } from '../Reference/Reference';
import { abs } from './Abstraction';

export const AbstractionVisualCommand: VisualCommand = {
  isActive(state) {
    return true;
  },
  render: ({ state: { selected }, dispatch, actions: { replace } }) => (
    <button onClick={() => dispatch([replace({ path: selected, ast: abs(arg('_'), ref('_')) })])}>abstraction</button>
  )
};
