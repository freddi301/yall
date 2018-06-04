import * as React from 'react';
import { AstComponent, AstComponentView, onEventNop } from './AstInterpreter';

export const kind = 'argument';

export type Argument = { kind: typeof kind; name: string };

export const arg = (name: string): Argument => ({ kind, name });

export const Argument: AstComponentView<{ name: React.ReactNode }> = ({ name, onEvent }) => (
  <span onClick={onEvent.select} onMouseOver={onEvent.hover}>
    {name}
  </span>
);

export const render: AstComponent<Argument> = ({ ast, path, eventDispatch, children }) => {
  if (ast.kind === kind) {
    return (
      <Argument name={(ast as any).name} onEvent={{ ...onEventNop, select: () => eventDispatch.select({ path }) }}>
        {children}
      </Argument>
    );
  }
  return <>{children}</>;
};
