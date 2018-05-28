import * as React from 'react';
import styled from 'styled-components';
import * as main from '../';
import { ObservableView } from '../ObservableView';
import { Path } from '../Path';
import { Grid, layout } from './grid';
import { override as ideOverride } from './override';

const Code = styled.code`
  font-family: monospace;
  font-size: 14px;
`;

export type IdeState = { ast: main.Ast; selected: main.AstPath };

export const ViewIde: ObservableView<IdeState> = ({ value: { ast, selected }, update }) => {
  const select = (path: main.AstPath) => {
    update({ ast, selected: path });
  };
  const override = ideOverride({ state: { ast, selected }, update });
  return (
    <>
      <div>
        <Grid cols={2} layout={layout} rowHeight={30}>
          <Code key="code" />
          <div key="side" />
        </Grid>
        <Path path={selected} onSelect={select} />
        <br />
        <Code key="code">{main.Ast({ ast, path: [], onSelect: select, override })}</Code>
      </div>
    </>
  );
};
