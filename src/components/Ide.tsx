import * as _ from 'lodash';
import * as React from 'react';
import * as lens from '../util/lens';
import * as Abstraction from './Abstraction';
import * as Application from './Application';
import * as Argument from './Argument';
import { Ast, AstInterpreter, AstPath, EventDispatch, eventDispatchNop } from './AstInterpreter';
import { Commands } from './Commands';
import * as EditLabel from './EditLabel';
import * as Highlight from './Highlight';
import { KeepFocus } from './KeepFocus';
import { KeyCommands } from './KeyCommands';
import { ObservableView } from './ObservableView';
import { Path } from './Path';
import * as Reference from './Reference';
import { Suggestions } from './Suggestion';

export type IdeState = { ast: Ast; selected: AstPath };

export const Ide: ObservableView<IdeState> = ({ value: ideState, update }) => {
  const { ast, selected } = ideState;
  const AstView = AstInterpreter({
    components: [
      Reference.render,
      Application.render,
      Abstraction.render,
      Argument.render,
      EditLabel.render({ selected }),
      Highlight.render({ selected })
    ]
  });
  const eventDispatch: EventDispatch = {
    ...eventDispatchNop,
    select({ path }: { path: AstPath }) {
      update({ ...ideState, selected: path });
    },
    replace(args: { path: AstPath; ast: Ast }) {
      const astLens: lens.Lens<Ast, Ast> = _.get(lens.properties<Ast>(), args.path, lens.identity);
      const newAst = astLens[lens.set](args.ast)(ast);
      update({ ...ideState, ast: newAst });
    }
  };
  return (
    <>
      <div>
        <Path path={selected} onSelect={eventDispatch.select} />
        <br />
        <KeyCommands ast={ast} selected={selected} eventDispatch={eventDispatch}>
          <KeepFocus>
            <AstView ast={ast} path={[]} eventDispatch={eventDispatch} view={AstView} />
          </KeepFocus>
        </KeyCommands>
        <Suggestions />
        <Commands ast={ast} selected={selected} eventDispatch={eventDispatch} />
      </div>
    </>
  );
};
