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

export const defaultAstViewMiddlewares: Array<AstComponentMiddleware<Ast>> = [
  AstViewSelectorFactory({
    components: new Map([
      ['reference', ReferenceContainer as AstViewComponent<Ast>],
      ['application', ApplicationContainer as AstViewComponent<Ast>],
      ['abstraction', AbstractionContainer as AstViewComponent<Ast>],
      ['argument', ArgumentContainer as AstViewComponent<Ast>]
    ])
  }),
  EditLabelComponentMiddleware,
  HighlightComponentMiddleware
];
