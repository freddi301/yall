import * as _ from 'lodash';
import * as React from 'react';
import { Key } from '../../components/Key';
import { KeyboardCommand } from '../../Ide/KeyboardCommands/KeyboardCommand';
import { AbstractionKind } from '../Abstraction/Abstraction';
import { ref, ReferenceKind } from '../Reference/Reference';
import { app, ApplicationKind } from './Application';

export const ApplicationKeyboardCommand: KeyboardCommand = {
  isActive({ selected, ast }) {
    const selectedAst = _.get(ast, selected, ast);
    return [ReferenceKind, ApplicationKind, AbstractionKind].includes(selectedAst.kind);
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
  action({ state: { selected, ast }, dispatch, actions: { replace, select } }) {
    const selectedAst = _.get(ast, selected, ast);
    dispatch([replace({ path: selected, ast: app(selectedAst, ref('')) }), select({ path: selected.concat('right') })]);
  }
};
