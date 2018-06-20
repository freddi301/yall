import * as React from 'react';
import { IdeControl } from '../Ide';
import { IdeState } from '../state';

export type KeyboardCommand = {
  isActive(ideState: IdeState): boolean;
  render(ideState: IdeState): React.ReactNode;
  matchKeys(event: React.KeyboardEvent<HTMLElement>): boolean;
  action(control: IdeControl): void;
};
