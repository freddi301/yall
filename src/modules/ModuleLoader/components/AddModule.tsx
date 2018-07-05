import * as React from "react";
import { ModuleLoaderContext, ModuleName } from "../ModuleLoaderContainer";

export class AddModule extends React.Component<{}, { moduleName: ModuleName }, {}> {
  public state = { moduleName: "" };
  public render() {
    return (
      <ModuleLoaderContext.Consumer>
        {({ loadModule }) => (
          <div>
            <input type="text" onChange={event => this.setState({ moduleName: event.target.value })} />
            <button onClick={() => loadModule(this.state.moduleName)}>load</button>
          </div>
        )}
      </ModuleLoaderContext.Consumer>
    );
  }
}
