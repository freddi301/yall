import { flatten } from "lodash";
import * as React from "react";

export type ModuleName = string;
export type ModuleShape = { default: ModuleExport[]; description: React.ReactNode };
export type ModuleExport = any;

export const ModuleLoaderContext = React.createContext<ModuleLoaderState>(null as any);
export const ModuleExportsContext = React.createContext<ModuleExport[]>(null as any);

type ModuleLoaderState = {
  moduleLoading: Map<ModuleName, Promise<ModuleShape>>;
  moduleInstances: Map<ModuleName, ModuleShape>;
  moduleError: Map<ModuleName, Error>;
  loadModule(moduleName: ModuleName): Promise<ModuleShape>;
};

type ModuleLoaderProps = { initialModules: ModuleName[] };

export class ModuleLoader extends React.Component<ModuleLoaderProps, ModuleLoaderState, {}> {
  public state = {
    moduleLoading: new Map(),
    moduleInstances: new Map(),
    moduleError: new Map(),
    loadModule: (moduleName: ModuleName) => this.loadModule(moduleName)
  };
  public render() {
    this.ensureInitialModulesLoaded();
    const moduleExports = ModuleLoader.getModuleExports(this.state.moduleInstances);
    return (
      <ModuleLoaderContext.Provider value={this.state}>
        <ModuleExportsContext.Provider value={moduleExports}>{this.props.children}</ModuleExportsContext.Provider>
      </ModuleLoaderContext.Provider>
    );
  }
  private async loadModule(moduleName: ModuleName): Promise<ModuleShape> {
    if (this.isAlreadyLoaded(moduleName)) {
      return this.getExistingModule(moduleName);
    }
    const modulePromise = import("../" + moduleName);
    this.setState(({ moduleLoading }) => ({ moduleLoading: new Map(moduleLoading).set(moduleName, modulePromise) }));
    try {
      const moduleInstance = await modulePromise;
      this.setState(({ moduleInstances }) => ({ moduleInstances: new Map(moduleInstances).set(moduleName, moduleInstance) }));
      return moduleInstance;
    } catch (error) {
      this.setState(({ moduleError }) => ({ moduleError: new Map(moduleError).set(moduleName, error) }));
      throw error;
    }
  }
  private isAlreadyLoaded(moduleName: ModuleName): boolean {
    const { moduleInstances, moduleLoading } = this.state;
    return moduleInstances.has(moduleName) || moduleLoading.has(moduleName);
  }
  private async getExistingModule(moduleName: ModuleName): Promise<ModuleShape> {
    const { moduleInstances, moduleLoading } = this.state;
    return moduleInstances.get(moduleName) || moduleLoading.get(moduleName);
  }
  private static getModuleExports(modules: Map<ModuleName, ModuleShape>): ModuleExport[] {
    const allModules = Array.from(modules.values());
    const moduleExports = flatten(allModules.map(mod => mod.default));
    return moduleExports;
  }
  private async ensureInitialModulesLoaded() {
    const { initialModules } = this.props;
    await Promise.resolve();
    initialModules.forEach(moduleName => this.loadModule(moduleName));
  }
}
