import {Node} from "./Node";
import React from "react";

export function registerMockDvf(TreeUtils) {
  function MockDVFRenderer(props) {
    function handleChange(field) {
      return function (event) {
        props.updateTree([...props.path, field], event.target.value);
      }
    }

    return (
      <Node path={props.path} title={TreeUtils.getDescription(props.node)} updateTree={props.updateTree}>
        <form>
          <div className="form-group">
            <label>Start Date</label><input type={"text"} className={"form-control"}
                                            onChange={handleChange("startDate")} value={props.node.startDate}/>
          </div>
          <div className="form-group">
            <label>End Date</label><input type={"text"} className={"form-control"} onChange={handleChange("endDate")}
                                          value={props.node.endDate}/>
          </div>
          <div className="form-group">
            <label>Products</label><input type={"text"} className={"form-control"} onChange={handleChange("products")}
                                          value={props.node.products}/>
          </div>
        </form>

      </Node>
    )
  }

  TreeUtils.registerSymbol({
    symbol: "total_sales_dvf",
    startDate: "19/11/2018",
    endDate: "19/11/2019",
    products: "Bugblaster"
  }, {
    name: "Total Sales for product in date range",
    description: "Total Sales for __products__ between __startDate__ and __endDate__",
  }, MockDVFRenderer);
}
