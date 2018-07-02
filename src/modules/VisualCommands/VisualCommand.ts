import * as React from 'react';
import { IdeContext } from '../../Ide/Ide';
import { IdeState } from '../../Ide/state';

export type VisualCommand = {
  isActive(ideState: IdeState): boolean;
  render(context: IdeContext): React.ReactNode;
};
