import * as React from "react";
import { ModuleLoaderContext, ModuleShape } from "../ModuleLoaderContainer";
import { ModuleItem } from "./ModuleItem";

export const ModuleList = () => (
  <ModuleLoaderContext.Consumer>
    {({ moduleLoading, moduleInstances, moduleError }) => {
      const moduleNames = Array.from(moduleLoading.keys());
      return (
        <div>
          {moduleNames.map(moduleName => {
            if (moduleError.has(moduleName)) {
              return (
                <ModuleItem name={moduleName}>
                  <ModuleItem.Error error={moduleError.get(moduleName) as Error} />
                </ModuleItem>
              );
            } else if (moduleInstances.has(moduleName)) {
              return <ModuleItem name={moduleName}>{(moduleInstances.get(moduleName) as ModuleShape).description}</ModuleItem>;
            } else if (moduleLoading.has(moduleName)) {
              return <ModuleItem name={moduleName}>Loading...</ModuleItem>;
            } else {
              return <ModuleItem name={moduleName}>Unrecognized module</ModuleItem>;
            }
          })}
        </div>
      );
    }}
  </ModuleLoaderContext.Consumer>
);
