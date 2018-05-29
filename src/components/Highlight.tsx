import styled from 'styled-components';
import * as React from 'react';
import { Ast, AstComponent, AstPath } from './AstInterpreter';
import * as _ from 'lodash';

export const Highlight = styled.div`
  display: inline-block;
  background-color: gray;
`;

export const render = (selected: AstPath): AstComponent<Ast> => ({ ast, path, eventDispatch, children }) => {
  if (_.isEqual(selected, path)) {
    return <Highlight>{children}</Highlight>;
  }
  return <>{children}</>;
};
