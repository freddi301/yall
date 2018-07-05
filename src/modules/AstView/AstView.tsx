import * as React from "react";
import { Ast } from "../../modules/AstView/Ast";
import { AstPath } from "../../modules/AstView/Path";
import { AstComponentMiddleware } from "./AstViewMiddleware";

export const AstViewContext: React.Context<AstComponentMiddleware<Ast>> = React.createContext(() => <></>);

export const AstViewFactory = ({ middlewares }: { middlewares: Array<AstComponentMiddleware<Ast>> }) => {
  const interpreter = ({ ast, path }: { ast: Ast; path: AstPath }) => {
    return middlewares.reduce(
      (memo, Component) => (
        <Component ast={ast} path={path}>
          {memo}
        </Component>
      ),
      null
    );
  };
  const AstView: AstComponentMiddleware<Ast> = ({ ast, path }) => (
    <AstViewContext.Provider value={interpreter}>
      <AstViewContext.Consumer>{View => <View ast={ast} path={path} />}</AstViewContext.Consumer>
    </AstViewContext.Provider>
  );
  return AstView;
};
