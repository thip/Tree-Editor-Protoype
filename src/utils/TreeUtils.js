import {registerAllNodes} from "../nodes/RegisterNodes";

function TreeUtils(){
  let symbolRenderers = {};
  let symbolDefs = {};
  let symbolMeta = {};

  return {
    registerSymbol: function(definition, meta, renderer){
      const symbol = definition.symbol;
      symbolRenderers[symbol] = function(node, path, updateTree){return renderer({node: node, path: path, updateTree: updateTree})};
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
    getSelectableSymbols: function(){
      return Object.keys(symbolDefs).filter(symbol => symbolMeta[symbol].name !== undefined).map(symbol => [symbol, symbolMeta[symbol].name])
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
    }
  };
}

export default registerAllNodes(TreeUtils());
