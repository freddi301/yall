import { InsertIntoRightApplicationKeyboardCommand } from "./keyboardCommands/InsertIntoRightApplicationKeyboardCommand";
import { InsertToRightApplicationKeyboardCommand } from "./keyboardCommands/InsertToRightApplicationKeyboardCommand";
import { InsertInPlaceApplicationVisualCommand } from "./visualCommands/visualCommand";

export default [
  new InsertInPlaceApplicationVisualCommand(),
  new InsertIntoRightApplicationKeyboardCommand(),
  new InsertToRightApplicationKeyboardCommand()
];
