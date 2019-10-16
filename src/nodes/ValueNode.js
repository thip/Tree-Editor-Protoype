import {Node} from "./Node";
import React from "react";

export function registerValueNode(TreeUtils) {
  function ValueRenderer(props) {
    function handleChange(event) {
      props.updateTree([...props.path, "value"], event.target.value);
    }

    return (
      <Node path={props.path} title={"Value"} updateTree={props.updateTree}>
        <input type={"text"} className={"form-control"} onChange={handleChange} value={props.node.value}/>
      </Node>
    )
  }

  TreeUtils.registerSymbol({
    symbol: "value",
    value: 0
  }, {
    name: "Value",
    description: "__value__"
  }, ValueRenderer);
}
