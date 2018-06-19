import * as _ from 'lodash';
import * as React from 'react';
import * as lens from '../util/lens';
import * as Abstraction from './Abstraction';
import * as Application from './Application';
import * as Argument from './Argument';
import { Ast, AstInterpreter, AstPath, EventDispatch, eventDispatchNop } from './AstInterpreter';
import * as EditLabel from './EditLabel';
import * as Highlight from './Highlight';
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
  const keyCommand = (e: any) => {
    const selectedAst = _.get(ast, selected, ast);
    if (e.key === '\\' && selectedAst.kind === Reference.kind) {
      // TODO: focus on body
      eventDispatch.replace({ path: selected, ast: Abstraction.abs(Argument.arg(_.get(ast, selected, ast).name), Reference.ref('_')) });
    } else if (
      e.key === ' ' &&
      (selectedAst.kind === Reference.kind || selectedAst.kind === Abstraction.kind || selectedAst.kind === Application.kind)
    ) {
      // TODO: focus on right
      eventDispatch.replace({ path: selected, ast: Application.app(selectedAst, Reference.ref('_')) });
    } else if (
      e.key === 'Backspace' &&
      (selectedAst.kind === Reference.kind || selectedAst.kind === Abstraction.kind || selectedAst.kind === Application.kind)
    ) {
      eventDispatch.replace({ path: selected, ast: Reference.ref('_') });
    }
  };
  return (
    <>
      <div>
        <Path path={selected} onSelect={eventDispatch.select} />
        <br />
        <code onKeyPress={keyCommand}>
          <KeepFocus>
            <AstView ast={ast} path={[]} eventDispatch={eventDispatch} view={AstView} />
          </KeepFocus>
        </code>
        <Suggestions />
        <div>
          <button onClick={() => eventDispatch.replace({ path: selected, ast: Abstraction.abs(Argument.arg('_'), Reference.ref('_')) })}>
            abstraction
          </button>
          <button onClick={() => eventDispatch.replace({ path: selected, ast: Application.app(Reference.ref('_'), Reference.ref('_')) })}>
            application
          </button>
          <button onClick={() => eventDispatch.replace({ path: selected, ast: Reference.ref('_') })}>reference</button>
          <button onClick={(e: any) => e.target.focus()} onKeyPress={keyCommand}>
            focus
          </button>
        </div>
        implement copy paste here
      </div>
    </>
  );
};

class KeepFocus extends React.Component<{}, {}> {
  public render() {
    return (
      <div tabIndex={0} ref={this.setElement}>
        {this.props.children}
      </div>
    );
  }
  public componentDidUpdate() {
    if (!this.element.contains(document.activeElement)) {
      this.element.focus();
    }
    console.log(document.activeElement); //tslint:disable-line
  }
  private element: HTMLDivElement;
  private setElement = (element: HTMLDivElement) => (this.element = element);
}
