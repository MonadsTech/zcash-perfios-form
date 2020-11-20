import React from "react";

import { Router } from "@reach/router";
import { PerfiosScreen } from "./screens/PerfiosScreen";
import { EnachScreen } from "./screens/EnachScreen";
import { DigiSignScreen } from "./screens/DigiSignScreen";

const Home = () => "Home to zcash APIs";

function App() {
  return (
    <div className="App">
      <Router>
        <PerfiosScreen path="/perfios" />
        <EnachScreen path="/enach" />
        <DigiSignScreen path="/digisign" />
        <Home default />
      </Router>
    </div>
  );
}

export default App;
