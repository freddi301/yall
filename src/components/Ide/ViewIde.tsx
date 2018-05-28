import * as _ from 'lodash';
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
  const hihglightSelected = (path: main.AstPath) => {
    if (_.isEqual(selected, path)) {
      return (children: React.ReactNode) => <div style={{ border: '1px solid black', display: 'inline-block' }}>{children}</div>;
    }
    return main.NoDecoration;
  };
  return (
    <>
      <div>
        <Grid cols={2} layout={layout} rowHeight={30}>
          <Code key="code" />
          <div key="side" />
        </Grid>
        <Path path={selected} onSelect={select} />
        <br />
        <Code key="code">{main.Ast({ ast, path: [], onSelect: select, override, decorate: hihglightSelected })}</Code>
      </div>
    </>
  );
};
