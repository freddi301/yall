import * as React from 'react';
import { IdeControl } from '../Ide';
import { VisualCommand } from './VisualCommand';

export const VisualCommands: React.StatelessComponent<IdeControl & { visualCommands: VisualCommand[] }> = ({
  state,
  update,
  visualCommands
}) => {
  const displayedCommands = visualCommands
    .filter(visualCommand => visualCommand.isActive(state))
    .map(visualCommand => visualCommand.render({ state, update }))
    .map((element, index) => <div key={index}>{element}</div>);
  return <div>{displayedCommands}</div>;
};
