import * as _ from 'lodash';
import * as React from 'react';
import styled from 'styled-components';
import { Ast, AstComponent, AstPath } from './AstInterpreter';

export const Highlight = styled.div`
  display: inline-block;
  background-color: gray;
`;

export const render = ({ selected }: { selected: AstPath }): AstComponent<Ast> => ({ ast, path, eventDispatch, children }) => {
  if (_.isEqual(selected, path)) {
    return <Highlight>{children}</Highlight>;
  }
  return <>{children}</>;
};
