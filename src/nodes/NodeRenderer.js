import TreeUtils from "../utils/TreeUtils";

export function NodeRenderer(props) {
  return TreeUtils.getSymbolRenderer(props.node.symbol)(props.node, props.path, props.updateTree);
}
