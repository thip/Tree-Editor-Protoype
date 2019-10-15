import React, {useState} from 'react';
import './App.css';
import {Card} from "react-bootstrap";

let symbols = {};
let symbolDefs = {};

registerSymbol(GreaterThan, GreaterThanRenderer);
registerSymbol(Ratio, RatioRenderer);
registerSymbol(Nothing, NothingRenderer);
registerSymbol(Value, ValueRenderer);
registerSymbol(Root, RootRenderer);

function GreaterThan(){
  return {
    symbol: "gt",
    name: "Greater Than",
    description: "(__lhs__ > __rhs__)",
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


function Ratio(){
  return {
    symbol: "ratio",
    name: "Ratio",
    description: "(__lhs__:__rhs__)",
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


function Value(){
  return {
    symbol: "value",
    name: "Value",
    description: "__value__",
    value: 0
  };
}

function ValueRenderer(props){
  function handleChange(event){
    props.updateTree([...props.path, "value"], event.target.value);
  }

  return (
    <Node path={props.path} title={"Value"} updateTree={props.updateTree}>
      <input type={"text"} onChange={handleChange} value={props.node.value}/>
    </Node>
  )
}

function Nothing() {
  return {
    symbol: "nothing",
    description: "???",
  };
}

function NothingRenderer(props){
  function changeMe(e){
    props.updateTree(props.path, getDefault(e.target.value));
  }

  return (
    <Card>
      <Card.Header>???</Card.Header>
      <Card.Body>
        <select onChange={changeMe}>
          <option value={Nothing().symbol}>Nothing</option>
          {Object.keys(symbolDefs).filter(symbol => getDefault(symbol).name !== undefined).map(k => {
            let option = getDefault(k);
            return <option value={option.symbol}>{option.name}</option>
          })}
        </select>
      </Card.Body>
    </Card>)
}

function Root() {
  return {
    symbol: "root",
    description: "Your Tree",
    data: Nothing()
  }
}

function RootRenderer(props){
  return (<Card>
    <Card.Header>{getDescription(props.node)}</Card.Header>
    <NodeRenderer node={props.node.data} path={[...props.path, "data"]} updateTree={props.updateTree} />
  </Card>)
}

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

function registerSymbol(definition, renderer){
  const symbol = definition().symbol;
  symbols[symbol] = function(node, path, updateTree){return renderer({node: node, path: path, updateTree: updateTree})};
  symbolDefs[symbol] = definition;
}

function TreeRenderer(props){
  return props.data !== undefined ? symbols[props.data.symbol](props.data, [], props.updateTree) : ""
}

function getDescription(obj){
  const elementDescriptor = /__([a-z]+)__/g;
  const matches = obj.description.matchAll(elementDescriptor);

  let match_symbols = [];
  let match = matches.next();

  while(!match.done){
    match_symbols.push(match.value);
    match = matches.next();
  }

  let result = obj.description;

  for (const m of match_symbols) {
    if (obj[m[1]].description === undefined){
      result = result.replace(m[0], obj[m[1]].toString());
    } else {
      result = result.replace(m[0], getDescription(obj[m[1]]));
    }
  }

  return result;
}

function Node(props){
  function deleteNode(){
    props.updateTree(props.path, Nothing())
  }

  return <Card>
    <Card.Header>{props.title} <div style={{float: "right", cursor: "pointer"}} onClick={deleteNode}>X</div></Card.Header>
    <Card.Body>{props.children}</Card.Body>
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
