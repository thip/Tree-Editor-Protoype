(this["webpackJsonpfun-with-trees"]=this["webpackJsonpfun-with-trees"]||[]).push([[0],{16:function(e,t,n){e.exports=n(24)},21:function(e,t,n){},22:function(e,t,n){},24:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(11),l=n.n(o),c=(n(21),n(5)),u=(n(22),n(25)),i=n(12),p=n(13);var s=n(2);function d(e){var t=Object(a.useState)(!1),n=Object(c.a)(t,2),o=n[0],l=n[1];return r.a.createElement(u.a,null,r.a.createElement(u.a.Header,{onClick:function(){l(!o)}},e.title,r.a.createElement("div",{style:{float:"right",cursor:"pointer"},onClick:function(){e.updateTree(e.path,b.createNode("nothing"))}},"X")),o?"":r.a.createElement(u.a.Body,null,e.children))}function m(e){return b.getSymbolRenderer(e.node.symbol)(e.node,e.path,e.updateTree,e.type)}function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var h,b=(function(e,t){e.registerSymbol({symbol:"nothing"},{description:"undefined"},(function(t){var n=e.createNode("nothing");return r.a.createElement(u.a,null,r.a.createElement(u.a.Header,null,e.getDescription(n)),r.a.createElement(u.a.Body,null,r.a.createElement("select",{onChange:function(n){t.updateTree(t.path,e.createNode(n.target.value))},className:"form-control"},r.a.createElement("option",{value:n.symbol},"Nothing"),e.getSelectableSymbols(t.type).map((function(e){var t=Object(c.a)(e,2),n=t[0],a=t[1];return r.a.createElement("option",{key:n,value:n},a)})))))}))}(h=function(){var e={},t={},n={};return{registerSymbol:function(a,r,o){var l=a.symbol;e[l]=function(e,t,n,a){return o({node:e,path:t,updateTree:n,type:a})},t[l]=a,n[l]=r},getDescription:function(e){if(void 0===n[e.symbol])return"";var t=n[e.symbol].description,a=!0,r=!1,o=void 0;try{for(var l,c=n[e.symbol].description.matchAll(/__([a-zA-Z0-9_]+)__/g)[Symbol.iterator]();!(a=(l=c.next()).done);a=!0){var u=l.value,i=u[1],p=u[0],s=e[i];t=void 0===s.symbol?t.replace(p,s.toString()):t.replace(p,this.getDescription(s))}}catch(d){r=!0,o=d}finally{try{a||null==c.return||c.return()}finally{if(r)throw o}}return t},createNode:function(e){return t[e]||t.nothing},getSymbolRenderer:function(t){return e[t]},getSelectableSymbols:function(e){return Object.keys(t).filter((function(t){return void 0!==n[t].name&&(n[t].type===e||null==e)})).map((function(e){return[e,n[e].name]}))},getSymbolMeta:function(e){return n[e]},setValue:function(e,t,n){var a=Object(p.a)(t),r=a[0],o=a.slice(1),l=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(n,!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e);return 0===o.length?(l[r]=n,l):(l[r]=this.setValue(l[r],o,n),l)}}}()),function(e){e.registerSymbol({symbol:"gt",lhs:e.createNode("nothing"),rhs:e.createNode("nothing")},{name:"Greater Than",description:"(__lhs__ > __rhs__)",type:"boolean",propertyTypes:{lhs:"number",rhs:"number"}},(function(t){return r.a.createElement(d,{path:t.path,title:e.getDescription(t.node),updateTree:t.updateTree},r.a.createElement(m,{node:t.node.lhs,path:[].concat(Object(s.a)(t.path),["lhs"]),updateTree:t.updateTree,type:e.getSymbolMeta(t.node.symbol).propertyTypes.lhs}),r.a.createElement(m,{node:t.node.rhs,path:[].concat(Object(s.a)(t.path),["rhs"]),updateTree:t.updateTree,type:e.getSymbolMeta(t.node.symbol).propertyTypes.rhs}))}))}(h),function(e){e.registerSymbol({symbol:"ratio",lhs:e.createNode("nothing"),rhs:e.createNode("nothing")},{name:"Ratio",description:"(__lhs__:__rhs__)",type:"number",propertyTypes:{lhs:"number",rhs:"number"}},(function(t){return r.a.createElement(d,{path:t.path,title:e.getDescription(t.node),updateTree:t.updateTree},r.a.createElement(m,{node:t.node.lhs,path:[].concat(Object(s.a)(t.path),["lhs"]),updateTree:t.updateTree,type:e.getSymbolMeta(t.node.symbol).propertyTypes.lhs}),r.a.createElement(m,{node:t.node.rhs,path:[].concat(Object(s.a)(t.path),["rhs"]),updateTree:t.updateTree,type:e.getSymbolMeta(t.node.symbol).propertyTypes.rhs}))}))}(h),function(e){e.registerSymbol({symbol:"value",value:0},{name:"Value",description:"__value__",type:"number"},(function(e){return r.a.createElement(d,{path:e.path,title:"Value",updateTree:e.updateTree},r.a.createElement("input",{type:"text",className:"form-control",onChange:function(t){e.updateTree([].concat(Object(s.a)(e.path),["value"]),t.target.value)},value:e.node.value}))}))}(h),function(e){e.registerSymbol({symbol:"total_sales_dvf",startDate:"19/11/2018",endDate:"19/11/2019",products:"Bugblaster"},{name:"Total Sales for product in date range",description:"Total Sales for __products__ between __startDate__ and __endDate__",type:"number"},(function(t){function n(e){return function(n){t.updateTree([].concat(Object(s.a)(t.path),[e]),n.target.value)}}return r.a.createElement(d,{path:t.path,title:e.getDescription(t.node),updateTree:t.updateTree},r.a.createElement("form",null,r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Start Date"),r.a.createElement("input",{type:"text",className:"form-control",onChange:n("startDate"),value:t.node.startDate})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"End Date"),r.a.createElement("input",{type:"text",className:"form-control",onChange:n("endDate"),value:t.node.endDate})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Products"),r.a.createElement("input",{type:"text",className:"form-control",onChange:n("products"),value:t.node.products}))))}))}(h),function(e){e.registerSymbol({symbol:"root",description:"Condition:",data:e.createNode("nothing")},{description:"Condition:",type:"boolean",propertyTypes:{data:"boolean"}},(function(t){return r.a.createElement(u.a,null,r.a.createElement(u.a.Header,null,e.getDescription(t.node)),r.a.createElement(m,{node:t.node.data,path:[].concat(Object(s.a)(t.path),["data"]),updateTree:t.updateTree,type:e.getSymbolMeta(t.node.symbol).propertyTypes.data}))}))}(h),h);function f(e){return void 0!==e.data?b.getSymbolRenderer(e.data.symbol)(e.data,[],e.updateTree):""}var g=function(){var e=b.createNode("root"),t=Object(a.useState)(e),n=Object(c.a)(t,2),o=n[0],l=n[1];return r.a.createElement("div",null,r.a.createElement(f,{data:o,updateTree:function(e,t){l(b.setValue(o,e,t))}}),r.a.createElement(u.a,null,r.a.createElement(u.a.Body,null,r.a.createElement("pre",null,JSON.stringify(o,null,2)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(23);l.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[16,1,2]]]);
//# sourceMappingURL=main.9c7d261b.chunk.js.map