import * as _ from 'lodash';
import * as React from 'react';
import { replace } from '../../Ide/actions';
import { KeyboardCommand } from '../../Ide/KeyboardCommands/KeyboardCommand';
import { Key } from '../../Ide/KeyboardCommands/KeyboardCommands';
import { kind as abstractionKind } from '../Abstraction/Abstraction';
import { kind as applicationKind } from '../Application/Application';
import { kind as referenceKind, ref } from '../Reference/Reference';

export const ReferenceKeyboardCommand: KeyboardCommand = {
  isActive({ selected, ast }) {
    const selectedAst = _.get(ast, selected, ast);
    return [referenceKind, applicationKind, abstractionKind].includes(selectedAst.kind);
  },
  matchKeys({ key }) {
    return key === 'r';
  },
  render() {
    return (
      <div>
        <Key>r</Key> reference
      </div>
    );
  },
  action({ state, update }) {
    const { selected } = state;
    update(replace({ path: selected, ast: ref('_') })(state));
  }
};
