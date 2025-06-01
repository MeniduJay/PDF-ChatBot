import React from "react";
import Upload from "./Upload";
import "./RightSection.css";
import Chatbot from "./Chatbot";

interface RightSectionProps {
  onSummaryReceived: (summary: string) => void;
}

export default function RightSection({ onSummaryReceived }: RightSectionProps) {
  return (
    <div className="right-section-container">
      <div className="right-section-content">
        <Chatbot />
      </div>
      <div className="upload-wrapper">
        <Upload onSummaryReceived={onSummaryReceived} />
      </div>
    </div>
  );
}
