import React from "react";

export function registerRootNode(TreeUtils) {
  TreeUtils.registerSymbol({
    symbol: "root",
    description: "Condition:",
    data: TreeUtils.createNode("nothing")
  }, {
    description: "Condition:",
    type: "boolean",
    propertyTypes: {
      data: "boolean",
    }
  }, TreeUtils.GenericRenderer.bind(TreeUtils));
}
