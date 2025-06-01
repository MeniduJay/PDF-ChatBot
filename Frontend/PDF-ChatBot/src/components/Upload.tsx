import React, { useState } from "react";
import type { ChangeEvent } from "react";
import "./Upload.css";

type UploadProps = {
  onSummaryReceived: (summary: string) => void;
};

const Upload: React.FC<UploadProps> = ({ onSummaryReceived }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      onSummaryReceived(data.summary);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  <style></style>;

  return (
    <div className="upload-panel">
      <h2 className="upload-title">Upload PDF Document</h2>

      <div className="file-input-section">
        <label htmlFor="file-input" className="browse-btn">
          Browse files
        </label>
        <input
          id="file-input"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          hidden
        />
      </div>

      {file && (
        <div className="file-preview">
          <span className="file-icon">📄</span>
          <span className="file-name">{file.name}</span>
          <span className="file-size">
            {(file.size / (1024 * 1024)).toFixed(1)}MB
          </span>
          <button className="remove-btn" onClick={() => setFile(null)}>
            ✕
          </button>
        </div>
      )}

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <button
          className="upload-submit"
          onClick={handleUpload}
          disabled={!file}
        >
          Upload & Summarize
        </button>
      )}
    </div>
  );
};

export default Upload;
