import React, {useState} from 'react';
import './App.css';
import {Card} from "react-bootstrap";

let symbols = {};
let symbolDefs = {};
let symbolMeta = {};

let GreaterThanMeta = {
  name: "Greater Than",
  description: "(__lhs__ > __rhs__)",
};

function GreaterThan(){
  return {
    symbol: "gt",
    lhs: Nothing(),
    rhs: Nothing()
  }
}

function GreaterThanRenderer(props){
  return(
    <Node path={props.path} title={getDescription(props.node)} updateTree={props.updateTree}>
      <NodeRenderer node={props.node.lhs} path={[...props.path, "lhs"]} updateTree={props.updateTree} />
      <NodeRenderer node={props.node.rhs} path={[...props.path, "rhs"]} updateTree={props.updateTree} />
    </Node>
  )
}

let RatioMeta = {
  name: "Ratio",
  description: "(__lhs__:__rhs__)",
};

function Ratio(){
  return {
    symbol: "ratio",
    lhs: Nothing(),
    rhs: Nothing()
  }
}

function RatioRenderer(props){
  return(
    <Node path={props.path} title={getDescription(props.node)} updateTree={props.updateTree}>
      <NodeRenderer node={props.node.lhs} path={[...props.path, "lhs"]} updateTree={props.updateTree} />
      <NodeRenderer node={props.node.rhs} path={[...props.path, "rhs"]} updateTree={props.updateTree} />
    </Node>
  )
}

let ValueMeta = {
  name: "Value",
  description: "__value__"
};

function Value(){
  return {
    symbol: "value",
    value: 0
  };
}

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

let MockDVFMeta = {
  name: "Total Sales for product in date range",
  description: "Total Sales for __products__ between __startDate__ and __endDate__",
};

function MockDVF(){
  return {
    symbol: "total_sales_dvf",
    startDate: "19/11/2018",
    endDate: "19/11/2019",
    products: "Bugblaster"
  };
}

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

let NothingMeta = {
  description: "undefined",
}

function Nothing() {
  return {
    symbol: "nothing",
  };
}

function NothingRenderer(props){
  function changeMe(e){
    props.updateTree(props.path, getDefault(e.target.value));
  }

  return (
    <Card>
      <Card.Header>{getDescription(Nothing())}</Card.Header>
      <Card.Body>
        <select onChange={changeMe} className={"form-control"}>
          <option value={Nothing().symbol}>Nothing</option>
          {Object.keys(symbolDefs).filter(symbol => symbolMeta[symbol].name !== undefined).map(symbol => {
            let meta = symbolMeta[symbol];
            return <option key={symbol} value={symbol}>{meta.name}</option>
          })}
        </select>
      </Card.Body>
    </Card>)
}

let RootMeta = {
    description: "Condition:",
}

function Root() {
  return {
    symbol: "root",
    description: "Condition:",
    data: Nothing()
  }
}

function RootRenderer(props){
  return (<Card>
    <Card.Header>{getDescription(props.node)}</Card.Header>
    <NodeRenderer node={props.node.data} path={[...props.path, "data"]} updateTree={props.updateTree} />
  </Card>)
}

registerSymbol(GreaterThan, GreaterThanMeta, GreaterThanRenderer);
registerSymbol(Ratio, RatioMeta, RatioRenderer);
registerSymbol(Nothing, NothingMeta, NothingRenderer);
registerSymbol(Value, ValueMeta, ValueRenderer);
registerSymbol(MockDVF, MockDVFMeta, MockDVFRenderer);
registerSymbol(Root, RootMeta, RootRenderer);

function NodeRenderer(props){
  return symbols[props.node.symbol](props.node, props.path, props.updateTree);
}

function getDefault(symbol){
  return (symbolDefs[symbol] || Nothing)();
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
  const symbol = definition().symbol;
  symbols[symbol] = function(node, path, updateTree){return renderer({node: node, path: path, updateTree: updateTree})};
  symbolDefs[symbol] = definition;
  symbolMeta[symbol] = meta;
}

function TreeRenderer(props){
  return props.data !== undefined ? symbols[props.data.symbol](props.data, [], props.updateTree) : ""
}

function getDescription(obj){
  const elementDescriptor = /__([a-zA-Z0-9_]+)__/g;

  if(symbolMeta[obj.symbol] === undefined){
    return ""
  }

  let description = symbolMeta[obj.symbol].description;
  const matches = description.matchAll(elementDescriptor);

  let match_symbols = [];
  let match = matches.next();

  while(!match.done){
    match_symbols.push(match.value);
    match = matches.next();
  }

  let result = description;

  for (const m of match_symbols) {
    let the_property = obj[m[1]];

    if (the_property.symbol === undefined){
      result = result.replace(m[0], the_property.toString());
    } else {
      result = result.replace(m[0], getDescription(obj[m[1]]));
    }
  }

  return result;
}

function Node(props){
  const [collapsed, updateCollapsed] = useState(false);

  function deleteNode(){
    props.updateTree(props.path, Nothing())
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
  const initial = Root();
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
