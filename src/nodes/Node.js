import React, {useState} from "react";
import TreeUtils from "../utils/TreeUtils";
import {Card} from "react-bootstrap";

export function Node(props) {
  const [collapsed, updateCollapsed] = useState(false);

  function deleteNode() {
    props.updateTree(props.path, TreeUtils.createNode("nothing"))
  }

  function togglePanel() {
    updateCollapsed(!collapsed);
  }

  return <Card>
    <Card.Header onClick={togglePanel}>{props.title}
      <div style={{float: "right", cursor: "pointer"}} onClick={deleteNode}>X</div>
    </Card.Header>
    {collapsed ? "" : <Card.Body>{props.children}</Card.Body>}
  </Card>
}
