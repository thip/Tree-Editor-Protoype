import {Node} from "./Node";
import {NodeRenderer} from "./NodeRenderer";
import React from "react";

export function registerRatioNode(TreeUtils) {
  function RatioRenderer(props) {
    return (
      <Node path={props.path} title={TreeUtils.getDescription(props.node)} updateTree={props.updateTree}>
        <NodeRenderer node={props.node.lhs} path={[...props.path, "lhs"]} updateTree={props.updateTree} type={TreeUtils.getSymbolMeta(props.node.symbol).propertyTypes["lhs"]}/>
        <NodeRenderer node={props.node.rhs} path={[...props.path, "rhs"]} updateTree={props.updateTree} type={TreeUtils.getSymbolMeta(props.node.symbol).propertyTypes["rhs"]}/>
      </Node>
    )
  }

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
  }, RatioRenderer);
}
