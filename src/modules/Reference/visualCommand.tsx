import * as React from 'react';
import { ref } from '../Reference/Reference';
import { VisualCommand } from '../VisualCommands/VisualCommand';

export const ReferenceVisualCommand: VisualCommand = {
  isActive(state) {
    return true;
  },
  render: ({ state: { selected }, dispatch, actions: { replace } }) => (
    <button onClick={() => dispatch([replace({ path: selected, ast: ref('_') })])}>reference</button>
  )
};
