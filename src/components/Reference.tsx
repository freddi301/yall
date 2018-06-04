import * as React from 'react';
import { AstComponent, AstComponentView, onEventNop } from './AstInterpreter';

export const kind = 'reference';

export type Reference = { kind: typeof kind; name: string };

export const ref = (name: string): Reference => ({ kind, name });

export const Reference: AstComponentView<{ name: React.ReactNode }> = ({ name, onEvent }) => (
  <span onClick={onEvent.select} onMouseOver={onEvent.hover}>
    {name}
  </span>
);

export const render: AstComponent<Reference> = ({ ast, path, eventDispatch, children }) => {
  if (ast.kind === kind) {
    return (
      <Reference name={(ast as any).name} onEvent={{ ...onEventNop, select: () => eventDispatch.select({ path }) }}>
        {children}
      </Reference>
    );
  }
  return <>{children}</>;
};
