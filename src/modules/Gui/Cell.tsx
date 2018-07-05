import * as React from "react";
import styled from "styled-components";

const CellWrapper = styled.div`
  padding: 4px;
  overflow: auto;
  border: 1px solid black;
`;

export class Cell extends React.Component<{}, { x: number; y: number; width: number; height: number }> {
  public state = { x: 1, y: 1, width: 1, height: 1 };
  public render() {
    const { width, height } = this.state;
    return (
      <CellWrapper style={{ gridRowEnd: `span ${height}`, gridColumnEnd: `span ${width}` }}>
        <div>
          {/* <input
            style={{ width: "20px" }}
            type="number"
            value={x}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ x: Number(e.target.value) })}
          />
          <input
            style={{ width: "20px" }}
            type="number"
            value={y}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ y: Number(e.target.value) })}
          /> */}
          <input
            style={{ width: "20px" }}
            type="number"
            value={width}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ width: Number(e.target.value) })}
          />
          <input
            style={{ width: "20px" }}
            type="number"
            value={height}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ height: Number(e.target.value) })}
          />
        </div>
        <div>{this.props.children}</div>
      </CellWrapper>
    );
  }
}
