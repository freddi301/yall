import * as React from 'react';
import { VisualCommand } from '../../Ide/VisualCommands/VisualCommand';
import { ref } from '../Reference/Reference';

export const ReferenceVisualCommand: VisualCommand = {
  isActive(state) {
    return true;
  },
  render: ({ state: { selected }, dispatch, actions: { replace } }) => (
    <button onClick={() => dispatch([replace({ path: selected, ast: ref('_') })])}>reference</button>
  )
};
