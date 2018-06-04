import * as React from 'react';
import { AstPath } from './AstInterpreter';

const select = (path: AstPath, onSelect: (args: { path: AstPath }) => void) => () => onSelect({ path });

export const Path = ({ path, onSelect }: { path: AstPath; onSelect: (args: { path: AstPath }) => void }) => (
  <span>
    <span onClick={select([], onSelect)}>⌂</span>
    {path.map((item, index) => (
      <span key={index} onClick={select(path.slice(0, index + 1), onSelect)}>
        .{item}
      </span>
    ))}
  </span>
);
