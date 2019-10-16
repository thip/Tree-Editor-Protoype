import React, {useState} from 'react';
import './App.css';
import {Card} from "react-bootstrap";
import TreeUtils from "./utils/TreeUtils";
import {TreeRenderer} from "./utils/TreeRenderer";

function App() {
  const initial = TreeUtils.createNode("root");
  const [data, dataUpdater] = useState(initial);

  function updateTree(path, value){
    dataUpdater(TreeUtils.setValue(data, path, value));
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
