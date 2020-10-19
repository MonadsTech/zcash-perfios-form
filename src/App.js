import React from "react";

import { Router } from "@reach/router";
import { PerfiosScreen } from "./screens/PerfiosScreen";

const Home = () => "Home to zcash APIs";

function App() {
  return (
    <div className="App">
      <Router>
        <PerfiosScreen path="/perfios" />
        <Home default />
      </Router>
    </div>
  );
}

export default App;
