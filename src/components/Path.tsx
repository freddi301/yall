import * as React from 'react';

const select = (path: string[], onSelect: (path: string[]) => void) => () => onSelect(path);

export const Path = ({ path, onSelect }: { path: string[]; onSelect: (path: string[]) => void }) => (
  <span>
    <span onClick={select([], onSelect)}>⌂</span>
    {path.map((item, index) => (
      <span key={index} onClick={select(path.slice(0, index + 1), onSelect)}>
        .{item}
      </span>
    ))}
  </span>
);
