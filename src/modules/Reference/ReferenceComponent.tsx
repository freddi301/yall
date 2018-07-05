import * as React from "react";

export const ReferenceComponent = ({ name, onEvent: { select } }: { name: React.ReactNode; onEvent: { select: () => void } }) => {
  return <span onClick={select}>{name || "_"}</span>;
};
