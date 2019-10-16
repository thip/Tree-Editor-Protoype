import {Card} from "react-bootstrap";
import React from "react";

export function registerNothingNode(TreeUtils, type) {
  function NothingRenderer(props) {
    function changeMe(e) {
      props.updateTree(props.path, TreeUtils.createNode(e.target.value));
    }

    let node = TreeUtils.createNode("nothing");
    return (
      <Card bg={"warning"}>
        <Card.Header>{TreeUtils.getDescription(node)}</Card.Header>
        <Card.Body>
          <select onChange={changeMe} className={"form-control"}>
            <option value={node.symbol}>Nothing</option>
            {TreeUtils.getSelectableSymbols(props.type).map(([symbol, name]) => {
              return <option key={symbol} value={symbol}>{name}</option>
            })}
          </select>
        </Card.Body>
      </Card>)
  }

  TreeUtils.registerSymbol({
    symbol: "nothing",
  }, {
    description: "undefined",
  }, NothingRenderer);
}
