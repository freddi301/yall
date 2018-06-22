import { Ast } from '../../core/Ast';
import { AbstractionContainer } from '../../plugins/Abstraction/AbstractionContainer';
import { ApplicationContainer } from '../../plugins/Application/ApplicationContainer';
import { ArgumentContainer } from '../../plugins/Argument/ArgumentContainer';
import { EditLabelComponentMiddleware } from '../../plugins/EditLabel/EditLabel';
import { HighlightComponentMiddleware } from '../../plugins/HighLight/HighlightComponentMiddleware';
import { ReferenceContainer } from '../../plugins/Reference/ReferenceContainer';
import { AstViewComponent } from '../AstView/AstViewComponent';
import { AstComponentMiddleware } from '../AstView/AstViewMiddleware';
import { AstViewSelectorFactory } from '../AstView/AstViewSelector';
import { ReferenceKind } from '../../plugins/Reference/Reference';
import { ApplicationKind } from '../../plugins/Application/Application';
import { AbstractionKind } from '../../plugins/Abstraction/Abstraction';
import { ArgumentKind } from '../../plugins/Argument/Argument';

export const defaultAstViewMiddlewares: Array<AstComponentMiddleware<Ast>> = [
  AstViewSelectorFactory({
    components: new Map([
      [ReferenceKind, ReferenceContainer as AstViewComponent<Ast>],
      [ApplicationKind, ApplicationContainer as AstViewComponent<Ast>],
      [AbstractionKind, AbstractionContainer as AstViewComponent<Ast>],
      [ArgumentKind, ArgumentContainer as AstViewComponent<Ast>]
    ])
  }),
  EditLabelComponentMiddleware,
  HighlightComponentMiddleware
];
