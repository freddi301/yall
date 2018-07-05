import * as _ from "lodash";
import * as React from "react";
import { KeepFocus } from "../../components/KeepFocus";
import { IdeContext } from "../../Ide/Ide";
import { Key } from "./Key";
import { KeyboardCommand, KeyCombo } from "./KeyboardCommand";

export const KeyboardCommandsSuggestions: React.StatelessComponent<{ keyboardCommands: KeyboardCommand[] }> = ({ keyboardCommands }) => (
  <IdeContext.Consumer>
    {context => (
      <table>
        <tbody>
          {keyboardCommands.filter(keyboardCommand => keyboardCommand.isActive(context.state)).map((keyboardCommand, index) => (
            <tr key={index}>
              <td style={{ textAlign: "right" }}>
                <KeyComboComponent keyCombo={keyboardCommand.key} />
              </td>
              <td>{keyboardCommand.render(context.state)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </IdeContext.Consumer>
);

const KeyComboComponent = ({ keyCombo: { key, ctrl, shift } }: { keyCombo: KeyCombo }) => (
  <span>
    {ctrl ? <Key>⌃</Key> : null}
    {shift ? <Key>⇧</Key> : null}
    <Key>{keyGlyphs[key] || key}</Key>
  </span>
);

const keyGlyphs: { [index: string]: React.ReactNode } = { " ": "␣" };

export const KeyboardCommandsCapture: React.StatelessComponent<{ keyboardCommands: KeyboardCommand[] }> = ({
  keyboardCommands,
  children
}) => (
  <IdeContext.Consumer>
    {context => {
      const findCommand = (event: React.KeyboardEvent<HTMLElement>) =>
        keyboardCommands.filter(keyboardCommand => keyboardCommand.isActive(context.state)).find(matchKey(event));
      const onKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
        const command = findCommand(event);
        if (command) {
          command.action(context);
          event.stopPropagation();
          event.preventDefault();
        }
      };
      return <KeepFocus onKeyPress={onKeyPress}>{children}</KeepFocus>;
    }}
  </IdeContext.Consumer>
);

const matchKey = ({ key, ctrlKey, shiftKey }: React.KeyboardEvent<HTMLElement>) => (keyboardCommand: KeyboardCommand): boolean => {
  return _.isEqual(keyboardCommand.key, { key, ctrl: ctrlKey, shift: shiftKey });
};
