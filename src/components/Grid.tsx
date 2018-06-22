import ReactGridLayout = require('react-grid-layout');
import * as React from 'react';
import styled from 'styled-components';

export const Grid = ReactGridLayout.WidthProvider(ReactGridLayout);

const draggableHandle = 'draggable';
const draggableCancel = 'not-draggable';

export const IdeGrid: React.ComponentType = props => (
  <Grid margin={[0, 0]} draggableHandle={draggableHandle} draggableCancel={draggableCancel}>
    {props.children}
  </Grid>
);

const WidgetWrapper = styled.div`
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

export const Widget: React.ComponentType<{ heading: React.ReactNode; children: React.ReactNode }> = props => (
  <WidgetWrapper {...props}>
    <Heading className={draggableHandle}>{props.heading}</Heading>
    <div className={draggableCancel}>{props.children}</div>
  </WidgetWrapper>
);
