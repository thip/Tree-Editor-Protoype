import {Card} from "react-bootstrap";
import {NodeRenderer} from "./NodeRenderer";
import React from "react";

export function registerRootNode(TreeUtils) {
  function RootRenderer(props) {
    return (<Card>
      <Card.Header>{TreeUtils.getDescription(props.node)}</Card.Header>
      <NodeRenderer node={props.node.data} path={[...props.path, "data"]} updateTree={props.updateTree} type={TreeUtils.getSymbolMeta(props.node.symbol).propertyTypes["data"]}/>
    </Card>)
  }

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
  }, RootRenderer);
}
