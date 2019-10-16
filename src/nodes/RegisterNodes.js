import {registerNothingNode} from "./NothingNode";
import {registerGreaterThanNode} from "./GreaterThanNode";
import {registerRatioNode} from "./RatioNode";
import {registerValueNode} from "./ValueNode";
import {registerMockDvf} from "./MockDvfNode";
import {registerRootNode} from "./Root";
import {registerNamedNode} from "./NamedNode";

export function registerAllNodes(TreeUtils) {
  registerNothingNode(TreeUtils);
  registerGreaterThanNode(TreeUtils);
  registerRatioNode(TreeUtils);
  registerValueNode(TreeUtils);
  registerMockDvf(TreeUtils);
  registerRootNode(TreeUtils);
  registerNamedNode(TreeUtils);

  return TreeUtils;
}
