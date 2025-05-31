import React from "react";
import "./Summary.css";

type SummaryProps = {
  summary: string;
};

const Summary: React.FC<SummaryProps> = ({ summary }) => {
  // Parse the summary string into sections
  // Each section starts with "**Title**" followed by content (possibly multiple lines)
  const sections = React.useMemo(() => {
    if (!summary) return [];

    // Split by double newlines (paragraphs), but we'll group by section titles
    // Split by "\n\n**" so that each element starts with "**Title** ..."
    // But since the first section starts with "**", we normalize by adding a marker if needed

    // Normalize summary: ensure it starts with "**"
    const normalized = summary.trim().startsWith("**")
      ? summary.trim()
      : "**" + summary.trim();

    // Split by "\n\n**" but keep the "**" on each part by splitting on "\n\n" then checking for "**"
    // More robust way: use regex to extract sections

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
        <h3 className="summary-title">Summary</h3>
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
          {/* Split content by line breaks and render each as a paragraph */}
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
