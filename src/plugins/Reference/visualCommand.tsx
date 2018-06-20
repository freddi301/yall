import * as React from 'react';
import * as actions from '../../Ide/actions';
import { VisualCommand } from '../../Ide/VisualCommands/VisualCommand';
import { ref } from '../Reference/Reference';

export const ReferenceVisualCommand: VisualCommand = {
  isActive(state) {
    return true;
  },
  render({ state, update }) {
    const { selected } = state;
    const replaceOnCLick = () => update(actions.replace({ path: selected, ast: ref('_') })(state));
    return <button onClick={replaceOnCLick}>reference</button>;
  }
};
