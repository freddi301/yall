import * as _ from 'lodash';
import * as React from 'react';
import { Key } from '../../components/Key';
import { KeyboardCommand } from '../../Ide/KeyboardCommands/KeyboardCommand';
import { arg } from '../Argument/Argument';
import { ref, ReferenceKind } from '../Reference/Reference';
import { abs } from './Abstraction';

export const AbstractionKeyboardCommand: KeyboardCommand = {
  isActive({ selected, ast }) {
    const selectedAst = _.get(ast, selected, ast);
    return selectedAst.kind === ReferenceKind;
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
  action({ state, dispatch, actions: { replace, select } }) {
    const { selected, ast } = state;
    dispatch([
      replace({ path: selected, ast: abs(arg(_.get(ast, selected, ast).name), ref('')) }),
      select({ path: selected.concat('body') })
    ]);
  }
};
