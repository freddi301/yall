import * as React from 'react';
import styled from 'styled-components';
import { KeepFocus } from '../../components/KeepFocus';
import { IdeControl } from '../Ide';
import { KeyboardCommand } from './KeyboardCommand';

export const KeyboardCommandsSuggestions: React.StatelessComponent<IdeControl & { keyboardCommands: KeyboardCommand[] }> = ({
  state,
  update,
  keyboardCommands
}) => {
  const displayedCommands = keyboardCommands
    .filter(keyboardCommand => keyboardCommand.isActive(state))
    .map(keyboardCommand => keyboardCommand.render(state))
    .map((element, index) => <div key={index}>{element}</div>);
  return <div>{displayedCommands}</div>;
};

export const KeyboardCommands: React.StatelessComponent<IdeControl & { keyboardCommands: KeyboardCommand[] }> = ({
  state,
  update,
  keyboardCommands,
  children
}) => {
  const findCommand = (event: React.KeyboardEvent<HTMLElement>) =>
    keyboardCommands.filter(keyboardCommand => keyboardCommand.isActive(state)).find(keyboardCommand => keyboardCommand.matchKeys(event));
  const onKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
    const command = findCommand(event);
    if (command) {
      command.action({ state, update });
    }
  };
  return (
    <div onKeyPress={onKeyPress}>
      <KeepFocus>{children}</KeepFocus>
    </div>
  );
};

export const Key = styled.kbd`
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2), 0 0 5px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  font-size: 1em;
  padding: 3px 5px;
  display: inline-block;
  margin: 1px;
`;
