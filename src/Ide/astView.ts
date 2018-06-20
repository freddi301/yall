import { AstInterpreter } from '../Ide/AstView/AstInterpreter';
import * as Abstraction from '../plugins/Abstraction/Abstraction';
import * as Application from '../plugins/Application/Application';
import * as Argument from '../plugins/Argument/Argument';
import * as EditLabel from '../plugins/EditLabel/EditLabel';
import * as Highlight from '../plugins/HighLight/Highlight';
import * as Reference from '../plugins/Reference/Reference';
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
