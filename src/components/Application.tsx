import * as React from 'react';
import { Ast, AstComponent, onEventNop, AstComponentView } from './AstInterpreter';

export const kind = 'application';

export type Application = { kind: typeof kind; left: Ast; right: Ast };

export const app = (left: Ast, right: Ast): Application => ({ kind, left, right });

export const Application: AstComponentView<{ left: React.ReactNode; right: React.ReactNode }> = ({ left, right, onEvent }) => (
  <span>
    <span onClick={onEvent.select} onMouseOver={onEvent.hover}>
      (
    </span>
    {left}
    <span onClick={onEvent.select} onMouseOver={onEvent.hover}>
      &nbsp;
    </span>
    {right}
    <span onClick={onEvent.select} onMouseOver={onEvent.hover}>
      )
    </span>
  </span>
);

export const render: AstComponent<Application> = ({ ast, path, eventDispatch, children, view: View }) => {
  if (ast.kind === kind) {
    return (
      <Application
        left={<View ast={ast.left} path={path.concat('left')} eventDispatch={eventDispatch} view={View} />}
        right={<View ast={ast.right} path={path.concat('right')} eventDispatch={eventDispatch} view={View} />}
        onEvent={{ ...onEventNop, select: () => eventDispatch.select(path) }}
      >
        {children}
      </Application>
    );
  }
  return <>{children}</>;
};
