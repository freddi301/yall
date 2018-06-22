import * as React from 'react';

export const ArgumentComponent = ({ name, onEvent: { select } }: { name: React.ReactNode; onEvent: { select: () => void } }) => (
  <span onClick={select}>{name || '_'}</span>
);
