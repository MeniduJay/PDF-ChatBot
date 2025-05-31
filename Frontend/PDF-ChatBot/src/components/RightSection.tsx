import React from "react";
import Upload from "./upload";
import "./RightSection.css";

interface RightSectionProps {
  onSummaryReceived: (summary: string) => void;
}

export default function RightSection({ onSummaryReceived }: RightSectionProps) {
  return (
    <div className="right-section-container">
      <div className="right-section-content">Right Section conetent</div>
      <div className="upload-wrapper">
        <Upload onSummaryReceived={onSummaryReceived} />
      </div>
    </div>
  );
}
