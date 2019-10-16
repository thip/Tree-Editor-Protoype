import TreeUtils from "./TreeUtils";

export function TreeRenderer(props) {
  return props.data !== undefined ? TreeUtils.getSymbolRenderer(props.data.symbol)(props.data, [], props.updateTree) : ""
}
