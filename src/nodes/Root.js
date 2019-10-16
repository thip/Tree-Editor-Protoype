import {Card} from "react-bootstrap";
import {NodeRenderer} from "./NodeRenderer";
import React from "react";

export function registerRootNode(TreeUtils) {
  function RootRenderer(props) {
    return (<Card>
      <Card.Header>{TreeUtils.getDescription(props.node)}</Card.Header>
      <NodeRenderer node={props.node.data} path={[...props.path, "data"]} updateTree={props.updateTree}/>
    </Card>)
  }

  TreeUtils.registerSymbol({
    symbol: "root",
    description: "Condition:",
    data: TreeUtils.createNode("nothing")
  }, {
    description: "Condition:",
  }, RootRenderer);
}
