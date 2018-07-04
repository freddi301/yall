import * as React from "react";
import { KeepFocus } from "../../components/KeepFocus";
import { IdeContext } from "../../Ide/Ide";
import { KeyboardCommand } from "./KeyboardCommand";

export const KeyboardCommandsSuggestions: React.StatelessComponent<{ keyboardCommands: KeyboardCommand[] }> = ({ keyboardCommands }) => (
  <IdeContext.Consumer>
    {context =>
      keyboardCommands
        .filter(keyboardCommand => keyboardCommand.isActive(context.state))
        .map(keyboardCommand => keyboardCommand.render(context.state))
        .map((element, index) => <div key={index}>{element}</div>)
    }
  </IdeContext.Consumer>
);

export const KeyboardCommandsCapture: React.StatelessComponent<{ keyboardCommands: KeyboardCommand[] }> = ({
  keyboardCommands,
  children
}) => (
  <IdeContext.Consumer>
    {context => {
      const findCommand = (event: React.KeyboardEvent<HTMLElement>) =>
        keyboardCommands
          .filter(keyboardCommand => keyboardCommand.isActive(context.state))
          .find(keyboardCommand => keyboardCommand.matchKeys(event));
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
