import * as React from 'react';
import { ref } from '../Reference/Reference';
import { VisualCommand } from '../VisualCommands/VisualCommand';
import { app } from './Application';

export const ApplicationVisualCommand: VisualCommand = {
  isActive(state) {
    return true;
  },
  render: ({ state: { selected }, dispatch, actions: { replace } }) => (
    <button onClick={() => dispatch([replace({ path: selected, ast: app(ref(''), ref('')) })])}>application</button>
  )
};
