import * as Abstraction from '../components/Abstraction';
import * as Application from '../components/Application';
import * as Argument from '../components/Argument';
import { AstInterpreter } from '../components/AstInterpreter';
import * as EditLabel from '../components/EditLabel';
import * as Highlight from '../components/Highlight';
import * as Reference from '../components/Reference';
import { IdeState } from './state';

export const astView = ({ selected }: IdeState) =>
  AstInterpreter({
    components: [
      Reference.render,
      Application.render,
      Abstraction.render,
      Argument.render,
      EditLabel.render({ selected }),
      Highlight.render({ selected })
    ]
  });
