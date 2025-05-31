import { useState } from "react";
import "./App.css";
import LeftSection from "./components/LeftSection";
import RightSection from "./components/RightSection";

function App() {
  const [summary, setSummary] = useState("");
  return (
    <div className="main-container">
      <div className="left-section">
        <LeftSection summary={summary} />
      </div>
      <div className="right-section">
        <RightSection onSummaryReceived={setSummary} />
      </div>
    </div>
  );
}

export default App;
