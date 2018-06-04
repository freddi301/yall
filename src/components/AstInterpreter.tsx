import * as React from 'react';
import { UnknownAst } from './UnknownAst';

export type Ast = { kind: string; [index: string]: any };

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
  select: (args: { path: AstPath }) => void;
  hover: (args: { path: AstPath }) => void;
  replace: (args: { path: AstPath; ast: Ast }) => void;
};

export type OnEvent = {
  select: () => void;
  hover: () => void;
};

export const eventDispatchNop: EventDispatch = {
  select: (args: { path: AstPath }) => undefined,
  hover: (args: { path: AstPath }) => undefined,
  replace: (args: { path: AstPath; ast: Ast }) => undefined
};

export const onEventNop: OnEvent = {
  select: () => undefined,
  hover: () => undefined
};
