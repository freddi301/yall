import * as React from 'react';

export const Reference = ({ name, onSelect }: { name: React.ReactNode; onSelect: () => void }) => <span onClick={onSelect}>{name}</span>;

export const Application = ({ left, right, onSelect }: { left: React.ReactNode; right: React.ReactNode; onSelect: () => void }) => (
  <span>
    <span onClick={onSelect}>(</span>
    {left}
    <span onClick={onSelect}>&nbsp;</span>
    {right}
    <span onClick={onSelect}>)</span>
  </span>
);

export const Argument = ({ name, onSelect }: { name: React.ReactNode; onSelect: () => void }) => <span onClick={onSelect}>{name}</span>;

export const Abstraction = ({ head, body, onSelect }: { head: React.ReactNode; body: React.ReactNode; onSelect: () => void }) => (
  <span>
    {head} <span onClick={onSelect}>=></span> {body}
  </span>
);

const AstVisitor = ({ path, onSelect }: { path: string[]; onSelect: (path: string[]) => void }) => {
  const select = (value: string[]) => () => onSelect(value);
  return {
    reference({ ast }: { ast: Reference }) {
      return <Reference name={ast.name} onSelect={select(path)} />;
    },
    application({ ast }: { ast: Application }) {
      const left = <Ast ast={ast.left} path={[...path, 'left']} onSelect={onSelect} />;
      const right = <Ast ast={ast.right} path={[...path, 'right']} onSelect={onSelect} />;
      return <Application left={left} right={right} onSelect={select(path)} />;
    },
    abstraction({ ast }: { ast: Abstraction }) {
      const head = <Argument name={<span>{ast.head.name}</span>} onSelect={select([...path, 'head'])} />;
      const body = <Ast ast={ast.body} path={[...path, 'body']} onSelect={onSelect} />;
      return <Abstraction head={head} body={body} onSelect={select(path)} />;
    },
    argument({ ast }: { ast: Argument }) {
      return <Argument name={ast.name} onSelect={select(path)} />;
    }
  };
};

export const Ast = ({ ast, path, onSelect }: { ast: Ast | Argument; path: string[]; onSelect: (path: string[]) => void }): JSX.Element => {
  const visitor = AstVisitor({ path, onSelect });
  switch (ast.kind) {
    case 'reference':
      return visitor.reference({ ast });
    case 'application':
      return visitor.application({ ast });
    case 'abstraction':
      return visitor.abstraction({ ast });
    case 'argument':
      return visitor.argument({ ast });
    default:
      return (
        <>
          <span>invalid ast</span>
          <pre>{JSON.stringify(ast, null, 2)}</pre>
        </>
      );
  }
};

export type Reference = { kind: 'reference'; name: string };
export type Application = { kind: 'application'; left: Ast; right: Ast };
export type Argument = { kind: 'argument'; name: string };
export type Abstraction = { kind: 'abstraction'; head: Argument; body: Ast };
export type Ast = Reference | Application | Abstraction;

export const ref = (name: string): Reference => ({ kind: 'reference', name });
export const app = (left: Ast, right: Ast): Application => ({ kind: 'application', left, right });
export const arg = (name: string): Argument => ({ kind: 'argument', name });
export const abs = (head: Argument, body: Ast): Abstraction => ({ kind: 'abstraction', head, body });
