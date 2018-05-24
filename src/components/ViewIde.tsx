import { get } from 'lodash';
import * as React from 'react';
import { Ast } from '.';
import { ObservableView } from './ObservableView';
import { Path } from './Path';

export const ViewIde: ObservableView<{ ast: Ast; selected: string[] }> = ({ value: { ast, selected }, update }) => {
  const select = (path: string[]) => {
    console.log({ root: ast, path, ast: get(ast, path) }); // tslint:disable-line
    update({ ast, selected: path });
  };
  return (
    <>
      <div>
        <Path path={selected} onSelect={select} />
      </div>
      <div>
        <Ast ast={get(ast, selected) || ast} path={selected} onSelect={select} />
      </div>
    </>
  );
};
