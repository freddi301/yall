import * as _ from 'lodash';
import * as React from 'react';
import { Input } from '../../components/Input';
import { Ast } from '../../core/Ast';
import { AstComponentMiddleware } from '../../Ide/AstView/AstViewMiddleware';
import { IdeContext } from '../../Ide/Ide';
import * as Argument from '../Argument/Argument';
import * as Reference from '../Reference/Reference';

export const EditLabelComponentMiddleware: AstComponentMiddleware<Ast> = ({ ast, path, children }) => (
  <IdeContext.Consumer>
    {({ state: { selected }, dispatch, actions: { replace } }) => {
      if (_.isEqual(selected, path)) {
        if (ast.kind === Reference.kind) {
          const reference: Reference.Reference = ast as Reference.Reference;
          const onChange = (name: string) => dispatch([replace({ path, ast: { ...reference, name } })]);
          return <Input value={reference.name} onChange={onChange} />;
        } else if (ast.kind === Argument.kind) {
          const argument: Argument.Argument = ast as Argument.Argument;
          const onChange = (name: string) => dispatch([replace({ path, ast: { ...argument, name } })]);
          return <Input value={argument.name} onChange={onChange} />;
        }
      }
      return <>{children}</>;
    }}
  </IdeContext.Consumer>
);
