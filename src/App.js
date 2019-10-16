import React, {useState} from 'react';
import './App.css';
import {Card} from "react-bootstrap";

let symbols = {};
let symbolDefs = {};
let symbolMeta = {};

function NothingRenderer(props){
  function changeMe(e){
    props.updateTree(props.path, createNode(e.target.value));
  }

  let node = createNode("nothing");
  return (
    <Card>
      <Card.Header>{getDescription(node)}</Card.Header>
      <Card.Body>
        <select onChange={changeMe} className={"form-control"}>
          <option value={node.symbol}>Nothing</option>
          {Object.keys(symbolDefs).filter(symbol => symbolMeta[symbol].name !== undefined).map(symbol => {
            let meta = symbolMeta[symbol];
            return <option key={symbol} value={symbol}>{meta.name}</option>
          })}
        </select>
      </Card.Body>
    </Card>)
}

registerSymbol({
  symbol: "nothing",
}, {
  description: "undefined",
}, NothingRenderer);

function GreaterThanRenderer(props){
  return(
    <Node path={props.path} title={getDescription(props.node)} updateTree={props.updateTree}>
      <NodeRenderer node={props.node.lhs} path={[...props.path, "lhs"]} updateTree={props.updateTree} />
      <NodeRenderer node={props.node.rhs} path={[...props.path, "rhs"]} updateTree={props.updateTree} />
    </Node>
  )
}

registerSymbol({
  symbol: "gt",
  lhs: createNode("nothing"),
  rhs: createNode("nothing")
}, {
  name: "Greater Than",
  description: "(__lhs__ > __rhs__)",
}, GreaterThanRenderer);

function RatioRenderer(props){
  return(
    <Node path={props.path} title={getDescription(props.node)} updateTree={props.updateTree}>
      <NodeRenderer node={props.node.lhs} path={[...props.path, "lhs"]} updateTree={props.updateTree} />
      <NodeRenderer node={props.node.rhs} path={[...props.path, "rhs"]} updateTree={props.updateTree} />
    </Node>
  )
}

registerSymbol({
  symbol: "ratio",
  lhs: createNode("nothing"),
  rhs: createNode("nothing")
}, {
  name: "Ratio",
  description: "(__lhs__:__rhs__)",
}, RatioRenderer);

function ValueRenderer(props){
  function handleChange(event){
    props.updateTree([...props.path, "value"], event.target.value);
  }

  return (
    <Node path={props.path} title={"Value"} updateTree={props.updateTree}>
      <input type={"text"} className={"form-control"} onChange={handleChange} value={props.node.value}/>
    </Node>
  )
}

registerSymbol({
  symbol: "value",
  value: 0
}, {
  name: "Value",
  description: "__value__"
}, ValueRenderer);

function MockDVFRenderer(props){
  function handleChange(field){
    return function(event){
      props.updateTree([...props.path, field], event.target.value);
    }
  }

  return (
    <Node path={props.path} title={getDescription(props.node)} updateTree={props.updateTree}>
      <form>
        <div className="form-group">
          <label>Start Date</label><input type={"text"} className={"form-control"} onChange={handleChange("startDate")} value={props.node.startDate}/>
        </div>
        <div className="form-group">
          <label>End Date</label><input type={"text"} className={"form-control"} onChange={handleChange("endDate")} value={props.node.endDate}/>
        </div>
        <div className="form-group">
          <label>Products</label><input type={"text"} className={"form-control"} onChange={handleChange("products")} value={props.node.products}/>
        </div>
      </form>

    </Node>
  )
}

registerSymbol({
  symbol: "total_sales_dvf",
  startDate: "19/11/2018",
  endDate: "19/11/2019",
  products: "Bugblaster"
}, {
  name: "Total Sales for product in date range",
  description: "Total Sales for __products__ between __startDate__ and __endDate__",
}, MockDVFRenderer);

function RootRenderer(props){
  return (<Card>
    <Card.Header>{getDescription(props.node)}</Card.Header>
    <NodeRenderer node={props.node.data} path={[...props.path, "data"]} updateTree={props.updateTree} />
  </Card>)
}

registerSymbol({
  symbol: "root",
  description: "Condition:",
  data: createNode("nothing")
}, {
  description: "Condition:",
}, RootRenderer);

function NodeRenderer(props){
  return symbols[props.node.symbol](props.node, props.path, props.updateTree);
}

function createNode(symbol){
  return symbolDefs[symbol] || symbolDefs["nothing"];
}

function setValue(obj_, path, value){
  let [element, ...rest] = path;
  let obj = {...obj_};

  if(rest.length === 0){
    obj[element] = value;
    return obj;
  }

  obj[element] = setValue(obj[element], rest, value);
  return obj
}

function registerSymbol(definition, meta, renderer){
  const symbol = definition.symbol;
  symbols[symbol] = function(node, path, updateTree){return renderer({node: node, path: path, updateTree: updateTree})};
  symbolDefs[symbol] = definition;
  symbolMeta[symbol] = meta;
}

function TreeRenderer(props){
  return props.data !== undefined ? symbols[props.data.symbol](props.data, [], props.updateTree) : ""
}

function getDescription(node){
  const elementDescriptor = /__([a-zA-Z0-9_]+)__/g;

  if(symbolMeta[node.symbol] === undefined){
    return ""
  }

  let description = symbolMeta[node.symbol].description;

  for (const match of symbolMeta[node.symbol].description.matchAll(elementDescriptor)) {
    let thePropertyName = match[1];
    let thePropertyToken = match[0];

    let theProperty = node[thePropertyName];

    if (theProperty.symbol === undefined){
      description = description.replace(thePropertyToken, theProperty.toString());
    } else {
      description = description.replace(thePropertyToken, getDescription(theProperty));
    }
  }

  return description;
}

function Node(props){
  const [collapsed, updateCollapsed] = useState(false);

  function deleteNode(){
    props.updateTree(props.path, createNode("nothing"))
  }

  function togglePanel(){
    updateCollapsed(!collapsed);
  }

  return <Card>
    <Card.Header onClick={togglePanel}>{props.title} <div style={{float: "right", cursor: "pointer"}} onClick={deleteNode}>X</div></Card.Header>
    {collapsed ? "" : <Card.Body>{props.children}</Card.Body>}
  </Card>
}

function App() {
  const initial = createNode("root");
  const [data, dataUpdater] = useState(initial);

  function updateTree(path, value){
    dataUpdater(setValue(data, path, value));
  }


  return (
    <div>
      <TreeRenderer data={data} updateTree={updateTree} />
      <Card>
        <Card.Body>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
