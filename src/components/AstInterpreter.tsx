import * as React from 'react';
import { UnknownAst } from './UnknownAst';

export type Ast = { kind: string };

export type AstComponent<T> = React.ComponentType<AstComponentProps<T>>;
export type AstComponentProps<T> = {
  ast: Ast & T;
  path: AstPath;
  eventDispatch: EventDispatch;
  view: AstComponent<Ast>;
};

export type AstComponentView<T> = React.ComponentType<T & { onEvent: OnEvent }>;

export const AstInterpreter = ({ components }: { components: Array<AstComponent<{}>> }): AstComponent<{}> => {
  return ({ ast, path, eventDispatch }) => {
    const view = AstInterpreter({ components });
    return (
      components.reduce(
        (memo, Component) => (
          <Component ast={ast} path={path} eventDispatch={eventDispatch} view={view}>
            {memo}
          </Component>
        ),
        null
      ) || <UnknownAst ast={ast} />
    );
  };
};

export type AstPath = string[];

export type EventDispatch = {
  select: (path: AstPath) => void;
  hover: (path: AstPath) => void;
};

export type OnEvent = {
  select: () => void;
  hover: () => void;
};

export const eventDispatchNop: EventDispatch = {
  select: (path: AstPath) => undefined,
  hover: (path: AstPath) => undefined
};

export const onEventNop: OnEvent = {
  select: () => undefined,
  hover: () => undefined
};
