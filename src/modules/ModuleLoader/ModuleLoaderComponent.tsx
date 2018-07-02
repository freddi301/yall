import * as React from "react";
import { ModuleLoaderContext } from "./ModuleLoaderContainer";

export class ModuleLoaderComponent extends React.Component<{}, { moduleName: string }, {}> {
  public state = { moduleName: "" };
  public render() {
    return (
      <ModuleLoaderContext.Consumer>
        {({ moduleLoading, moduleInstances, moduleError, loadModule }) => {
          const moduleNames = Array.from(moduleLoading.keys());
          const renderModule = (moduleName: string) =>
            moduleInstances.has(moduleName) ? (
              JSON.stringify(moduleInstances.get(moduleName))
            ) : moduleError.has(moduleName) ? (
              <span style={{ color: "red" }}>{(moduleError.get(moduleName) as Error).message}</span>
            ) : (
              ""
            );
          return (
            <div>
              <input type="text" onChange={event => this.setState({ moduleName: event.target.value })} />
              <button onClick={() => loadModule(this.state.moduleName)}>load</button>
              <ul>
                {moduleNames.map(moduleName => (
                  <li key={moduleName}>
                    {moduleName} {renderModule(moduleName)}
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </ModuleLoaderContext.Consumer>
    );
  }
}
