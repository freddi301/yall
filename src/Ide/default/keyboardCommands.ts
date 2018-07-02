import { AbstractionKeyboardCommand } from '../../modules/Abstraction/keyboardCommand';
import { ApplicationKeyboardCommand } from '../../modules/Application/keyboardCommand';
import { KeyboardCommand } from '../../modules/KeyboardCommands/KeyboardCommand';
import { ReferenceKeyboardCommand } from '../../modules/Reference/keyboardCommand';

export const defaultKeyboardCommands: KeyboardCommand[] = [
  AbstractionKeyboardCommand,
  ApplicationKeyboardCommand,
  ReferenceKeyboardCommand
];
