// src/App.jsx
import React from "react";
// import SoilMoistureDisplay from "./SoilMoistureDisplay";
import SoilMoistureDisplay from "./SoilMoistureDisplay";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Soil Moisture Monitor</h1>
      </header>
      <SoilMoistureDisplay />
    </div>
  );
}

export default App;
