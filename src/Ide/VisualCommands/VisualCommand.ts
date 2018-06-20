import * as React from 'react';
import { IdeControl } from '../Ide';
import { IdeState } from '../state';

export type VisualCommand = {
  isActive(ideState: IdeState): boolean;
  render(control: IdeControl): React.ReactNode;
};
