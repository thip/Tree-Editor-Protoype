import {Node} from "./Node";
import React from "react";
import {NodeRenderer} from "./NodeRenderer";

export function registerNamedNode(TreeUtils) {
  function ValueRenderer(props) {
    function handleChange(event) {
      props.updateTree([...props.path, "name"], event.target.value);
    }

    return (
      <Node path={props.path} title={props.node.name} updateTree={props.updateTree}>
        <input type={"text"} className={"form-control"} onChange={handleChange} value={props.node.name}/>
        <NodeRenderer node={props.node.data} path={[...props.path, "data"]} updateTree={props.updateTree} type={props.type}/>
      </Node>
    )
  }

  TreeUtils.registerSymbol({
    symbol: "namedNode",
    name: "unnamed",
    data: TreeUtils.createNode("nothing")
  }, {
    name: "Named Node",
    description: "__name__",
    type: "*"
  }, ValueRenderer);
}
