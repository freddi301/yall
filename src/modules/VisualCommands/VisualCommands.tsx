import * as React from 'react';
import { IdeContext } from '../../Ide/Ide';
import { VisualCommand } from './VisualCommand';

export const VisualCommands: React.StatelessComponent<{ visualCommands: VisualCommand[] }> = ({ visualCommands }) => {
  return (
    <IdeContext.Consumer>
      {context =>
        visualCommands
          .filter(visualCommand => visualCommand.isActive(context.state))
          .map(visualCommand => visualCommand.render(context))
          .map((element, index) => <div key={index}>{element}</div>)
      }
    </IdeContext.Consumer>
  );
};
