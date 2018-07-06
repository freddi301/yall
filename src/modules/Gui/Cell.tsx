import * as React from "react";
import styled from "styled-components";

const CellWrapper = styled.div`
  padding: 4px;
  overflow: auto;
  border: 1px solid black;
`;

export class Cell extends React.Component<{ width: number; height: number; x: number; y: number }, {}> {
  public render() {
    const { width, height, x, y } = this.props;
    return (
      <CellWrapper
        style={{
          gridRowEnd: `span ${height}`,
          gridColumnEnd: `span ${width}`,
          gridRowStart: y,
          gridColumnStart: x
        }}
      >
        {this.props.children}
      </CellWrapper>
    );
  }
}
