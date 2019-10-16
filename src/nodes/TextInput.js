import {Node} from "./Node";
import React from "react";

export function registerTextInput(TreeUtils) {
  function TextInput(props) {
    function handleChange(event) {
      props.updateTree([...props.path, "text"], event.target.value);
    }

    return (
      <Node path={props.path} title={"Text Input"} updateTree={props.updateTree}>
        <input type={"text"} className={"form-control"} onChange={handleChange} value={props.node.text}/>
      </Node>
    )
  }

  TreeUtils.registerSymbol({
    symbol: "textInput",
    text: ""
  }, {
    name: "Text Input",
    description: "__text__",
    type: "text",
  }, TextInput);
}
