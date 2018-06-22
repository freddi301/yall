import * as _ from 'lodash';
import * as React from 'react';
import { Key } from '../../components/Key';
import { KeyboardCommand } from '../../Ide/KeyboardCommands/KeyboardCommand';
import { kind as abstractionKind } from '../Abstraction/Abstraction';
import { kind as applicationKind } from '../Application/Application';
import { ref, ReferenceKind as referenceKind } from '../Reference/Reference';

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
  action({ state, dispatch, actions: { replace } }) {
    const { selected } = state;
    dispatch([replace({ path: selected, ast: ref('') })]);
  }
};
