import React from "react";
import Summary from "./summary";

import "./LeftSection.css";

interface LeftSectionProps {
  summary: string; // Change 'string' to the correct type if needed
}

export default function LeftSection({ summary }: LeftSectionProps) {
  return (
    <div className="left-section-container">
      <div className="summary-wrapper">
        <Summary summary={summary} />
      </div>
    </div>
  );
}
