import { AbstractionKeyboardCommand } from '../../plugins/Abstraction/keyboardCommand';
import { ApplicationKeyboardCommand } from '../../plugins/Application/keyboardCommand';
import { ReferenceKeyboardCommand } from '../../plugins/Reference/keyboardCommand';
import { KeyboardCommand } from '../KeyboardCommands/KeyboardCommand';

export const defaultKeyboardCommands: KeyboardCommand[] = [
  AbstractionKeyboardCommand,
  ApplicationKeyboardCommand,
  ReferenceKeyboardCommand
];
