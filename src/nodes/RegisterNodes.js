import {registerNothingNode} from "./NothingNode";
import {registerGreaterThanNode} from "./GreaterThanNode";
import {registerRatioNode} from "./RatioNode";
import {registerValueNode} from "./ValueNode";
import {registerMockDvf} from "./MockDvfNode";
import {registerRootNode} from "./Root";
import {registerNamedNode} from "./NamedNode";
import {registerTextInput} from "./TextInput";

export function registerAllNodes(TreeUtils) {
  registerNothingNode(TreeUtils);
  registerGreaterThanNode(TreeUtils);
  registerRatioNode(TreeUtils);
  registerValueNode(TreeUtils);
  registerMockDvf(TreeUtils);
  registerRootNode(TreeUtils);
  registerNamedNode(TreeUtils);
  registerTextInput(TreeUtils);

  return TreeUtils;
}
