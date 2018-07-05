import * as React from "react";
import { AstPath } from "../../modules/AstView/Path";

export const PathComponent = ({ path, onSelect }: { path: AstPath; onSelect: (args: { path: AstPath }) => void }) => (
  <span>
    <span onClick={() => onSelect({ path: [] })}>⌂</span>
    {path.map((item, index) => (
      <span key={index} onClick={() => onSelect({ path: path.slice(0, index + 1) })}>
        .{item}
      </span>
    ))}
  </span>
);
