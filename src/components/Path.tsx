import * as React from 'react';
import * as main from './';

const select = (path: main.AstPath, onSelect: (path: main.AstPath) => void) => () => onSelect(path);

export const Path = ({ path, onSelect }: { path: main.AstPath; onSelect: (path: main.AstPath) => void }) => (
  <span>
    <span onClick={select([], onSelect)}>⌂</span>
    {path.map((item, index) => (
      <span key={index} onClick={select(path.slice(0, index + 1), onSelect)}>
        .{item}
      </span>
    ))}
  </span>
);
