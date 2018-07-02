import { Ast } from '../../core/Ast';
import { AbstractionKind } from '../../modules/Abstraction/Abstraction';
import { AbstractionContainer } from '../../modules/Abstraction/AbstractionContainer';
import { ApplicationKind } from '../../modules/Application/Application';
import { ApplicationContainer } from '../../modules/Application/ApplicationContainer';
import { ArgumentKind } from '../../modules/Argument/Argument';
import { ArgumentContainer } from '../../modules/Argument/ArgumentContainer';
import { AstViewComponent } from '../../modules/AstView/AstViewComponent';
import { AstComponentMiddleware } from '../../modules/AstView/AstViewMiddleware';
import { AstViewSelectorFactory } from '../../modules/AstView/AstViewSelector';
import { EditLabelComponentMiddleware } from '../../modules/EditLabel/EditLabel';
import { HighlightComponentMiddleware } from '../../modules/HighLight/HighlightComponentMiddleware';
import { ReferenceKind } from '../../modules/Reference/Reference';
import { ReferenceContainer } from '../../modules/Reference/ReferenceContainer';

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
