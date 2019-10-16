import React from "react";

export function registerGreaterThanNode(TreeUtils) {
  TreeUtils.registerSymbol({
    symbol: "gt",
    lhs: TreeUtils.createNode("nothing"),
    rhs: TreeUtils.createNode("nothing")
  }, {
    name: "Greater Than",
    description: "(__lhs__ > __rhs__)",
    type: "boolean",
    propertyTypes: {
      lhs: "number",
      rhs: "number"
    }

  }, TreeUtils.GenericRenderer.bind(TreeUtils));
}
