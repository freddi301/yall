import * as _ from 'lodash';
import * as React from 'react';
import * as main from '../';
import { ObservableView } from '../ObservableView';
import { Path } from '../Path';
import { override as ideOverride } from './override';
import { Highlight } from '../Highlight';

export type IdeState = { ast: main.Ast; selected: main.AstPath };

export const ViewIde: ObservableView<IdeState> = ({ value: { ast, selected }, update }) => {
  const select = (path: main.AstPath) => {
    update({ ast, selected: path });
  };
  const override = ideOverride({ state: { ast, selected }, update });
  const hihglightSelected = (path: main.AstPath) => {
    if (_.isEqual(selected, path)) {
      return (children: React.ReactNode) => <Highlight>{children}</Highlight>;
    }
    return main.NoDecoration;
  };
  return (
    <>
      <div>
        <Path path={selected} onSelect={select} />
        <br />
        <code key="code">{main.Ast({ ast, path: [], onSelect: select, override, decorate: hihglightSelected })}</code>
      </div>
    </>
  );
};
