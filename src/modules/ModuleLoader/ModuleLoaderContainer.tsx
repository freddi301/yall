import * as React from "react";

type Module = { default?: any[]; description?: React.ReactNode };

type ModuleLoaderState = {
  moduleLoading: Map<string, Promise<Module>>;
  moduleInstances: Map<string, Module>;
  moduleError: Map<string, Error>;
  loadModule(moduleName: string): Promise<Module>;
};

export const ModuleLoaderContext = React.createContext<ModuleLoaderState>(null as any);

export class ModuleLoader extends React.Component<{}, { moduleName: string } & ModuleLoaderState, {}> {
  public state = {
    moduleName: "",
    moduleLoading: new Map(),
    moduleInstances: new Map(),
    moduleError: new Map(),
    loadModule: (moduleName: string) => this.loadModule(moduleName)
  };
  public render() {
    return <ModuleLoaderContext.Provider value={this.state}>{this.props.children}</ModuleLoaderContext.Provider>;
  }
  private async loadModule(moduleName: string): Promise<any> {
    const modulePromise = import("../" + moduleName);
    this.setState({ moduleLoading: new Map(this.state.moduleLoading).set(moduleName, modulePromise) });
    try {
      const moduleInstance = await modulePromise;
      this.setState({ moduleInstances: new Map(this.state.moduleInstances).set(moduleName, moduleInstance) });
      return moduleInstance;
    } catch (error) {
      this.setState({ moduleError: new Map(this.state.moduleError).set(moduleName, error) });
      throw error;
    }
  }
}
