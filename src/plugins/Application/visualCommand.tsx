import * as React from 'react';
import * as actions from '../../Ide/actions';
import { VisualCommand } from '../../Ide/VisualCommands/VisualCommand';
import { ref } from '../Reference/Reference';
import { app } from './Application';

export const ApplicationVisualCommand: VisualCommand = {
  isActive(state) {
    return true;
  },
  render({ state, update }) {
    const { selected } = state;
    const replaceOnCLick = () => update(actions.replace({ path: selected, ast: app(ref('_'), ref('_')) })(state));
    return <button onClick={replaceOnCLick}>application</button>;
  }
};
