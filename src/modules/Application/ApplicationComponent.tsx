import * as React from 'react';

export const ApplicationComponent = ({
  left,
  right,
  onEvent: { select }
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  onEvent: { select: () => void };
}) => (
  <span>
    <span onClick={select}>(</span>
    {left}
    <span onClick={select}>&nbsp;</span>
    {right}
    <span onClick={select}>)</span>
  </span>
);
