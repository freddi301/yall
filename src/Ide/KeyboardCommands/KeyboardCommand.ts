import * as React from 'react';
import { IdeContext } from '../Ide';
import { IdeState } from '../state';

export type KeyboardCommand = {
  isActive(ideState: IdeState): boolean;
  render(ideContext: IdeState): React.ReactNode;
  matchKeys(event: React.KeyboardEvent<HTMLElement>): boolean;
  action(context: IdeContext): void;
};
