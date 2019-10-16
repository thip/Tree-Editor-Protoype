import {registerAllNodes} from "../nodes/RegisterNodes";
import {Node} from "../nodes/Node";
import {NodeRenderer} from "../nodes/NodeRenderer";
import React from "react";

function TreeUtils(){
  let symbolRenderers = {};
  let symbolDefs = {};
  let symbolMeta = {};

  return {
    registerSymbol: function(definition, meta, renderer){
      const symbol = definition.symbol;
      symbolRenderers[symbol] = function(node, path, updateTree, type){return renderer({node: node, path: path, updateTree: updateTree, type: type})};
      symbolDefs[symbol] = definition;
      symbolMeta[symbol] = meta;
    },
    getDescription: function(node){
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
          description = description.replace(thePropertyToken, this.getDescription(theProperty));
        }
      }

      return description;
    },
    createNode: function(symbol){
      return symbolDefs[symbol] || symbolDefs["nothing"];
    },
    getSymbolRenderer: function(symbol){
      return symbolRenderers[symbol]
    },
    getSelectableSymbols: function(type){
      return Object.keys(symbolDefs)
        .filter(symbol => symbolMeta[symbol].name !== undefined && (symbolMeta[symbol].type === type || symbolMeta[symbol].type === "*" || type == null)).map(symbol => [symbol, symbolMeta[symbol].name])
    },
    getSymbolMeta: function(symbol){
      return symbolMeta[symbol];
    },
    setValue: function(obj_, path, value){
      let [element, ...rest] = path;
      let obj = {...obj_};

      if(rest.length === 0){
        obj[element] = value;
        return obj;
      }

      obj[element] = this.setValue(obj[element], rest, value);
      return obj
    },
    GenericRenderer: function (props) {
      let description = this.getDescription(props.node);
      let propertyTypes = this.getSymbolMeta(props.node.symbol).propertyTypes;

      return (
        <Node path={props.path} title={description} updateTree={props.updateTree}>
          {Object.keys(propertyTypes).map(propertyName => {
            let propertyType = propertyTypes[propertyName] === "*" ? props.type : propertyTypes[propertyName];

            return <NodeRenderer node={props.node[propertyName]} path={[...props.path, propertyName]} updateTree={props.updateTree} type={propertyType}/>
          })}
        </Node>
      )
    }
  };
}

export default registerAllNodes(TreeUtils());
