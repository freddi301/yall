import * as React from 'react';
import { VisualCommand } from '../../Ide/VisualCommands/VisualCommand';
import { ref } from '../Reference/Reference';
import { app } from './Application';

export const ApplicationVisualCommand: VisualCommand = {
  isActive(state) {
    return true;
  },
  render: ({ state: { selected }, dispatch, actions: { replace } }) => (
    <button onClick={() => dispatch([replace({ path: selected, ast: app(ref(''), ref('')) })])}>application</button>
  )
};
