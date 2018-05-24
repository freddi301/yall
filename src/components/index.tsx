import * as React from 'react';

export const Reference = ({ name }: { name: React.ReactNode }) => <span>{name}</span>;

export const Application = ({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => (
  <span>
    ({left} {right})
  </span>
);

export const Abstraction = ({ head, body }: { head: React.ReactNode; body: React.ReactNode }) => (
  <span>
    {head} => {body}
  </span>
);

export const Ast = ({ ast }: { ast: Ast }): JSX.Element => {
  switch (ast.kind) {
    case 'reference':
      return <Reference name={ast.name} />;
    case 'application':
      const left = <Ast ast={ast.left} />;
      const right = <Ast ast={ast.right} />;
      return <Application left={left} right={right} />;
    case 'abstraction':
      const head = <Reference name={ast.head} />;
      const body = <Ast ast={ast.body} />;
      return <Abstraction head={head} body={body} />;
  }
};

export type Reference = { kind: 'reference'; name: string };
export type Application = { kind: 'application'; left: Ast; right: Ast };
export type Abstraction = { kind: 'abstraction'; head: string; body: Ast };
export type Ast = Reference | Application | Abstraction;

export const ref = (name: string): Reference => ({ kind: 'reference', name });
export const app = (left: Ast, right: Ast): Application => ({ kind: 'application', left, right });
export const abs = (head: string, body: Ast): Abstraction => ({ kind: 'abstraction', head, body });

export class Observable<T> extends React.Component<
  { view: (props: { value: T; update: (value: T) => Promise<void> }) => React.ReactNode },
  { value: T },
  {}
> {
  update = (value: T): Promise<void> => new Promise(resolve => this.setState({ value }, resolve));
  render() {
    const { view } = this.props;
    const { value } = this.state;
    const update = this.update;
    return view({ update, value });
  }
}
