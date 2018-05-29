import * as React from 'react';
import ReactGridLayout = require('react-grid-layout');

export const Grid = ReactGridLayout.WidthProvider(ReactGridLayout);

export const layout = [
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

export const example = (
  <Grid cols={2} layout={layout} rowHeight={30}>
    <div key="code" />
    <div key="side" />
  </Grid>
);
