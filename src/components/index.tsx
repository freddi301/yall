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
    ({head} <span onClick={onSelect}>=></span> {body})
  </span>
);

export type AstPath = string[];

const AstVisitor = ({
  path,
  onSelect,
  override,
  decorate
}: {
  path: AstPath;
  onSelect: (path: AstPath) => void;
  override: (path: AstPath) => React.ReactNode | null;
  decorate: (path: AstPath) => (child: React.ReactNode) => React.ReactNode;
}) => {
  const select = (value: AstPath) => () => onSelect(value);
  return {
    reference({ ast }: { ast: Reference }) {
      return <Reference name={ast.name} onSelect={select(path)} />;
    },
    application({ ast }: { ast: Application }) {
      const left = Ast({ ast: ast.left, path: [...path, 'left'], onSelect, override, decorate });
      const right = Ast({ ast: ast.right, path: [...path, 'right'], onSelect, override, decorate });
      return <Application left={left} right={right} onSelect={select(path)} />;
    },
    abstraction({ ast }: { ast: Abstraction }) {
      const head = <Argument name={<span>{ast.head.name}</span>} onSelect={select([...path, 'head'])} />;
      const body = Ast({ ast: ast.body, path: [...path, 'body'], onSelect, override, decorate });
      return <Abstraction head={head} body={body} onSelect={select(path)} />;
    },
    argument({ ast }: { ast: Argument }) {
      return <Argument name={ast.name} onSelect={select(path)} />;
    }
  };
};

export type AstView = (
  args: {
    ast: Ast | Argument;
    path: AstPath;
    onSelect?: (path: AstPath) => void;
    override?: (path: AstPath) => React.ReactNode;
    decorate?: (path: AstPath) => (child: React.ReactNode) => React.ReactNode;
  }
) => React.ReactNode;

export const NoDecoration = (children: React.ReactNode) => children;

export const Ast: AstView = ({ ast, path, onSelect = () => null, override = () => null, decorate = () => NoDecoration }) => {
  const overrode = override(path);
  if (overrode) {
    return overrode;
  }
  const visitor = AstVisitor({ path, onSelect, override, decorate });
  switch (ast.kind) {
    case 'reference':
      return decorate(path)(visitor.reference({ ast }));
    case 'application':
      return decorate(path)(visitor.application({ ast }));
    case 'abstraction':
      return decorate(path)(visitor.abstraction({ ast }));
    case 'argument':
      return decorate(path)(visitor.argument({ ast }));
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
