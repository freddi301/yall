import * as React from 'react';
import { AstPath } from '../../core/Path';
import { AstViewContext } from '../../Ide/AstView/AstView';
import { IdeContext } from '../../Ide/Ide';
import { Application } from './Application';
import { ApplicationComponent } from './ApplicationComponent';

export const ApplicationContainer = ({ ast, path }: { ast: Application; path: AstPath }) => (
  <AstViewContext.Consumer>
    {View => (
      <IdeContext.Consumer>
        {({ dispatch, actions: { select } }) => (
          <ApplicationComponent
            left={<View ast={ast.left} path={path.concat('left')} />}
            right={<View ast={ast.right} path={path.concat('right')} />}
            onEvent={{ select: () => dispatch([select({ path })]) }}
          />
        )}
      </IdeContext.Consumer>
    )}
  </AstViewContext.Consumer>
);
