import * as React from "react";
import { ModuleLoaderContext, ModuleShape } from "../ModuleLoaderContainer";
import { ModuleItem } from "./ModuleItem";

export const ModuleList = () => (
  <ModuleLoaderContext.Consumer>
    {({ moduleLoading, moduleInstances, moduleError }) => {
      const moduleNames = Array.from(moduleLoading.keys());
      return (
        <div>
          {moduleNames.map(moduleName => (
            <ModuleItem key={moduleName} name={moduleName}>
              {(() => {
                if (moduleError.has(moduleName)) {
                  return <ModuleItem.Error error={moduleError.get(moduleName) as Error} />;
                } else if (moduleInstances.has(moduleName)) {
                  return (moduleInstances.get(moduleName) as ModuleShape).description;
                } else if (moduleLoading.has(moduleName)) {
                  return "Loading...";
                } else {
                  return "Unrecognized module";
                }
              })()}
            </ModuleItem>
          ))}
        </div>
      );
    }}
  </ModuleLoaderContext.Consumer>
);
