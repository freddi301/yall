import * as _ from 'lodash';
import * as React from 'react';
import { replace } from '../../Ide/actions';
import { KeyboardCommand } from '../../Ide/KeyboardCommands/KeyboardCommand';
import { Key } from '../../Ide/KeyboardCommands/KeyboardCommands';
import { arg } from '../Argument/Argument';
import { kind, ref } from '../Reference/Reference';
import { abs } from './Abstraction';

export const AbstractionKeyboardCommand: KeyboardCommand = {
  isActive({ selected, ast }) {
    const selectedAst = _.get(ast, selected, ast);
    return selectedAst.kind === kind;
  },
  matchKeys({ key }) {
    return key === '\\';
  },
  render() {
    return (
      <div>
        <Key>\</Key> abstraction
      </div>
    );
  },
  action({ state, update }) {
    const { selected, ast } = state;
    update(replace({ path: selected, ast: abs(arg(_.get(ast, selected, ast).name), ref('_')) })(state));
  }
};
