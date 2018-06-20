import * as _ from 'lodash';
import * as React from 'react';
import { replace } from '../../Ide/actions';
import { KeyboardCommand } from '../../Ide/KeyboardCommands/KeyboardCommand';
import { Key } from '../../Ide/KeyboardCommands/KeyboardCommands';
import { kind as abstractionKind } from '../Abstraction/Abstraction';
import { kind as referenceKind, ref } from '../Reference/Reference';
import { app, kind as applicationKind } from './Application';

export const ApplicationKeyboardCommand: KeyboardCommand = {
  isActive({ selected, ast }) {
    const selectedAst = _.get(ast, selected, ast);
    return [referenceKind, applicationKind, abstractionKind].includes(selectedAst.kind);
  },
  matchKeys({ key }) {
    return key === ' ';
  },
  render() {
    return (
      <div>
        <Key>&nbsp;</Key> application
      </div>
    );
  },
  action({ state, update }) {
    const { selected, ast } = state;
    const selectedAst = _.get(ast, selected, ast);
    update(replace({ path: selected, ast: app(selectedAst, ref('_')) })(state));
  }
};
