import React from "react";
import "./Summary.css";

type SummaryProps = {
  summary: string;
};

const Summary: React.FC<SummaryProps> = ({ summary }) => {
  const sections = React.useMemo(() => {
    if (!summary) return [];

    //Formating summary text which is in markup format to readable format

    // Normalize summary: ensure it starts with "**"
    const normalized = summary.trim().startsWith("**")
      ? summary.trim()
      : "**" + summary.trim();

    const regex = /\*\*(.+?)\*\*\s+([\s\S]*?)(?=(\n\n\*\*|$))/g;
    // This regex means:
    // - **(title)** followed by some whitespace
    // - Then content (including newlines), non-greedy until the next "**" or end of string

    const results: { title: string; content: string }[] = [];
    let match;

    while ((match = regex.exec(normalized)) !== null) {
      const title = match[1].trim();
      const content = match[2].trim();
      results.push({ title, content });
    }

    return results;
  }, [summary]);

  if (!summary) {
    return (
      <div className="summary-container">
        <h2 className="summary-title">Summary Section</h2>
        <p className="summary-placeholder">Upload a PDF to get a summary</p>
      </div>
    );
  }

  return (
    <div className="summary-container">
      <h3 className="summary-title">Summary</h3>
      {sections.map(({ title, content }) => (
        <div key={title} className="summary-section">
          <h4 className="summary-section-title">{title}</h4>

          {content.split("\n").map((line, idx) =>
            line.trim() ? (
              <p key={idx} className="summary-section-content">
                {line.trim()}
              </p>
            ) : null
          )}
        </div>
      ))}
    </div>
  );
};

export default Summary;
