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
    type: "number",
    name: "Greater Than",
    description: "(__lhs__ > __rhs__)",
    lhs: Nothing(),
    rhs: Nothing()
  }
}

function GreaterThanRenderer(props){
  return(
    <Card>
      <Card.Title>{getDescription(props.node)}</Card.Title>
      <NodeRenderer node={props.node.lhs} path={[...props.path, "lhs"]} updateTree={props.updateTree} />
      <NodeRenderer node={props.node.rhs} path={[...props.path, "rhs"]} updateTree={props.updateTree} />
    </Card>
  )
}


function Ratio(){
  return {
    symbol: "ratio",
    type: "number",
    name: "Ratio",
    description: "(__lhs__:__rhs__)",
    lhs: Nothing(),
    rhs: Nothing()
  }
}

function RatioRenderer(props){
  return(
    <Card>
      <Card.Title>{getDescription(props.node)}</Card.Title>
      <NodeRenderer node={props.node.lhs} path={[...props.path, "lhs"]} updateTree={props.updateTree} />
      <NodeRenderer node={props.node.rhs} path={[...props.path, "rhs"]} updateTree={props.updateTree} />
    </Card>
  )
}


function Value(){
  return {
    symbol: "value",
    name: "DVF",
    description: "__value__",
    type: "number",
    value: 0
  };
}

function ValueRenderer(props){
  function handleChange(event){
    props.updateTree([...props.path, "value"], event.target.value);
  }

  return (
    <Card>
      <input type={"text"} onChange={handleChange} value={props.node.value}/>
    </Card>
  )
}

function Nothing() {
  return {
    symbol: "nothing",
    description: "???",
    type: "number"
  };
}

function NothingRenderer(props){
  function changeMe(e){
    props.updateTree(props.path, getDefault(e.target.value));
  }

  return (
    <Card>
      <select onChange={changeMe}>
        <option value={getDefault().symbol}>Nothing</option>
        {Object.keys(symbolDefs).filter(k => getDefault(k).name !== undefined).map(k => {
          let option = getDefault(k);
          return <option value={option.symbol}>{option.name}</option>
        })}
      </select>
    </Card>)
}

function Root() {
  return {
    symbol: "root",
    description: "Your lovely thing",
    data: Nothing()
  }
}

function RootRenderer(props){
  return (<Card>
    <Card.Title>{getDescription(props.node)}</Card.Title>
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

function App() {
  const initial = Root(Nothing());
  const [data, dataUpdater] = useState(initial);

  function updateTree(path, value){
    dataUpdater(setValue(data, path, value));
  }


  return (
    <div>
      <TreeRenderer data={data} updateTree={updateTree} />
      <button onClick={() => prompt("", JSON.stringify(data))}>Show tree</button>
    </div>
  );
}

export default App;
