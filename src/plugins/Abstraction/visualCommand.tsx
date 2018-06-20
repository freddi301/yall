import * as React from 'react';
import * as actions from '../../Ide/actions';
import { VisualCommand } from '../../Ide/VisualCommands/VisualCommand';
import { arg } from '../Argument/Argument';
import { ref } from '../Reference/Reference';
import { abs } from './Abstraction';

export const AbstractionVisualCommand: VisualCommand = {
  isActive(state) {
    return true;
  },
  render({ state, update }) {
    const { selected } = state;
    const replaceOnCLick = () => update(actions.replace({ path: selected, ast: abs(arg('_'), ref('_')) })(state));
    return <button onClick={replaceOnCLick}>abstraction</button>;
  }
};
