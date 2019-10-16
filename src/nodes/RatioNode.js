import {Node} from "./Node";
import {NodeRenderer} from "./NodeRenderer";
import React from "react";

export function registerRatioNode(TreeUtils) {
  TreeUtils.registerSymbol({
    symbol: "ratio",
    lhs: TreeUtils.createNode("nothing"),
    rhs: TreeUtils.createNode("nothing")
  }, {
    name: "Ratio",
    description: "(__lhs__:__rhs__)",
    type: "number",
    propertyTypes: {
      lhs: "number",
      rhs: "number"
    }
  }, TreeUtils.GenericRenderer.bind(TreeUtils));
}
