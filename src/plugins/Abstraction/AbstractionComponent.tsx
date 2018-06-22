import * as React from 'react';

export const AbstractionComponent = ({
  head,
  body,
  onEvent: { select }
}: {
  head: React.ReactNode;
  body: React.ReactNode;
  onEvent: { select: () => void };
}) => (
  <span>
    <span onClick={select}>(</span>
    {head} <span onClick={select}>=></span> {body}
    <span onClick={select}>)</span>
  </span>
);
