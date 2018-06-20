import * as React from 'react';
import { Ast, AstComponent, AstComponentView, onEventNop } from '../../Ide/AstView/AstInterpreter';
import { Argument } from '../Argument/Argument';

export const kind = 'abstraction';

export type Abstraction = { kind: typeof kind; head: Argument; body: Ast };

export const abs = (head: Argument, body: Ast): Abstraction => ({ kind: 'abstraction', head, body });

export const Abstraction: AstComponentView<{ head: React.ReactNode; body: React.ReactNode }> = ({ head, body, onEvent }) => (
  <span>
    <span onClick={onEvent.select} onMouseOver={onEvent.hover}>
      (
    </span>
    {head}{' '}
    <span onClick={onEvent.select} onMouseOver={onEvent.hover}>
      =>
    </span>{' '}
    {body}
    <span onClick={onEvent.select} onMouseOver={onEvent.hover}>
      )
    </span>
  </span>
);

export const render: AstComponent<Abstraction> = ({ ast, path, eventDispatch, view: View, children }) => {
  if (ast.kind === kind) {
    return (
      <Abstraction
        head={<View ast={ast.head} path={path.concat('head')} eventDispatch={eventDispatch} view={View} />}
        body={<View ast={ast.body} path={path.concat('body')} eventDispatch={eventDispatch} view={View} />}
        onEvent={{ ...onEventNop, select: () => eventDispatch.select({ path }) }}
      >
        {children}
      </Abstraction>
    );
  }
  return <>{children}</>;
};
