import { get } from 'lodash';
import * as React from 'react';
import { Ast } from '.';
import { ObservableView } from './ObservableView';
import { Path } from './Path';

export const ViewIde: ObservableView<{ ast: Ast; selected: string[] }> = ({ value: { ast, selected }, update }) => {
  const select = (path: string[]) => {
    console.log({ root: ast, path, ast: get(ast, path) }); // tslint:disable-line
    update({ ast, selected: path });
  };
  return (
    <>
      <div>
        <Grid cols={2} layout={layout} rowHeight={30}>
          <div key="code">
            <Ast ast={ast} path={[]} onSelect={select} />
          </div>
          <div key="side">
            <div>
              <Path path={selected} onSelect={select} />
            </div>
            <div>
              <Ast ast={get(ast, selected) || ast} path={selected} onSelect={select} />
            </div>
          </div>
        </Grid>
      </div>
    </>
  );
};

import ReactGridLayout = require('react-grid-layout');
const Grid = ReactGridLayout.WidthProvider(ReactGridLayout);

const layout = [
  {
    i: 'code',
    x: 0,
    y: 0,
    w: 1,
    h: 1
  },
  {
    i: 'side',
    x: 1,
    y: 0,
    w: 1,
    h: 1
  }
];
