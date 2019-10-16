import {Node} from "./Node";
import {NodeRenderer} from "./NodeRenderer";
import React from "react";

export function registerGreaterThanNode(TreeUtils) {
  function GreaterThanRenderer(props) {
    return (
      <Node path={props.path} title={TreeUtils.getDescription(props.node)} updateTree={props.updateTree}>
        <NodeRenderer node={props.node.lhs} path={[...props.path, "lhs"]} updateTree={props.updateTree}/>
        <NodeRenderer node={props.node.rhs} path={[...props.path, "rhs"]} updateTree={props.updateTree}/>
      </Node>
    )
  }

  TreeUtils.registerSymbol({
    symbol: "gt",
    lhs: TreeUtils.createNode("nothing"),
    rhs: TreeUtils.createNode("nothing")
  }, {
    name: "Greater Than",
    description: "(__lhs__ > __rhs__)",
  }, GreaterThanRenderer);
}
