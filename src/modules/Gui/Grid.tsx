import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 10%);
  grid-template-rows: repeat(10, 10%);
  grid-gap: 1px;
  padding: 2px;
  width: 100%;
  height 100%;
`;
