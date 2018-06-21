import * as React from 'react';
import { IdeContext } from '../Ide';
import { IdeState } from '../state';

export type VisualCommand = {
  isActive(ideState: IdeState): boolean;
  render(context: IdeContext): React.ReactNode;
};
