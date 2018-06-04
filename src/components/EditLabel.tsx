import * as _ from 'lodash';
import * as React from 'react';
import * as Argument from '../components/Argument';
import * as Reference from '../components/Reference';
import { Ast, AstComponent, AstPath } from './AstInterpreter';
import { Input } from './Input';

export const render = ({ selected }: { selected: AstPath }): AstComponent<Ast> => ({ ast, path, eventDispatch, children }) => {
  if (_.isEqual(selected, path)) {
    if (ast.kind === Reference.kind) {
      const reference: Reference.Reference = ast as Reference.Reference;
      const onChange = (name: string) => eventDispatch.replace({ path, ast: { ...reference, name } });
      return <Input value={reference.name} onChange={onChange} />;
    } else if (ast.kind === Argument.kind) {
      const argument: Argument.Argument = ast as Argument.Argument;
      const onChange = (name: string) => eventDispatch.replace({ path, ast: { ...argument, name } });
      return <Input value={argument.name} onChange={onChange} />;
    }
  }
  return <>{children}</>;
};
