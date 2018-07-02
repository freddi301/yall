import * as React from "react";
import styled from "styled-components";

const CellWrapper = styled.div`
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  padding: 4px;
`;

const Heading = styled.div`
  border-bottom: 1px solid #f1f1f1;
  margin-bottom: 4px;
  user-select: none;
  cursor: move;
`;

export const Cell: React.ComponentType<{ heading?: React.ReactNode; children: React.ReactNode }> = props => (
  <CellWrapper {...props}>
    {props.heading ? <Heading>{props.heading}</Heading> : null}
    <div>{props.children}</div>
  </CellWrapper>
);