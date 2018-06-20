import * as React from 'react';
import styled from 'styled-components';

const Key = styled.kbd`
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2), 0 0 5px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  font-size: 1em;
  padding: 3px 5px;
  display: inline-block;
  margin: 1px;
`;

export const Suggestions = () => (
  <div>
    <Key>\</Key> abstraction<br />
    <Key>&nbsp;</Key> application<br />
    <Key>r</Key> reference
  </div>
);
