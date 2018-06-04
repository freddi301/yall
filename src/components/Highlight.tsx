import * as _ from 'lodash';
import * as React from 'react';
import styled from 'styled-components';
import { Ast, AstComponent, AstPath } from './AstInterpreter';

export const Highlight = styled.div`
  display: inline-block;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2), 0 0 20px 0 rgba(0, 0, 0, 0.19);
`;

export const render = ({ selected }: { selected: AstPath }): AstComponent<Ast> => ({ ast, path, eventDispatch, children }) => {
  if (_.isEqual(selected, path)) {
    return <Highlight>{children}</Highlight>;
  }
  return <>{children}</>;
};
