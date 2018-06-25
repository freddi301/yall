import ReactGridLayout = require('react-grid-layout');
import * as React from 'react';

export const Grid = ReactGridLayout.WidthProvider(ReactGridLayout);

export const IdeGrid: React.ComponentType = props => <Grid>{props.children}</Grid>;
