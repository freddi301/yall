import * as React from 'react';
import { ObservableView } from './ObservableView';
import { Path } from './Path';
import { Ast, AstPath, AstInterpreter, eventDispatchNop } from './AstInterpreter';

export type IdeState = { ast: Ast; selected: AstPath };

export const Ide: ObservableView<IdeState> = ({ value, update }) => {
  const { ast, selected } = value;
  const select = (path: AstPath) => {
    update({ ...value, selected: path });
  };
  const AstView = AstInterpreter({ components: [Reference.render, Application.render, Abstraction.render, Highlight.render(selected)] });
  return (
    <>
      <div>
        <Path path={selected} onSelect={select} />
        <br />
        <code>
          <AstView ast={ast} path={[]} eventDispatch={eventDispatchNop} view={AstView} />
        </code>
      </div>
    </>
  );
};

import * as Reference from './Reference';
import * as Application from './Application';
import * as Abstraction from './Abstraction';
import * as Highlight from './Highlight';
