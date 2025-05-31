import React, { useState } from "react";
import "./Chatbot.css";

export default function Chatbot() {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState<
    { message: string; answer: string }[]
  >([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    try {
      const res = await fetch("http://localhost:3000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setConversation((prev) => [...prev, data]);
      setQuestion("");
    } catch (err) {
      console.error("Error fetching chatbot response:", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleButtonClick = () => {
    if (!question.trim()) return;

    // Create a synthetic event object
    const syntheticEvent = {
      preventDefault: () => {},
    } as React.FormEvent;

    handleSubmit(syntheticEvent);
  };

  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto";
    target.style.height = Math.min(target.scrollHeight, 120) + "px";
  };

  return (
    <div className="chatbot-app">
      {/* Header */}
      <div className="chatbot-header">
        <div className="header-content">
          <h1 className="main-title">PDF Research Assistant</h1>
          <p className="subtitle">
            Ask questions about your document and get instant answers
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="chat-container">
        {/* Chat Messages */}
        <div className="chat-messages">
          {conversation.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg
                  width="48"
                  height="48"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="empty-title">Start a conversation</h3>
              <p className="empty-description">
                Upload your PDF document and ask any questions about its
                content. I'll help you find the information you need.
              </p>
            </div>
          ) : (
            conversation.map((item, index) => (
              <div key={index} className="message-pair">
                {/* User Message */}
                <div className="message-row user-row">
                  <div className="message-content user-message">
                    <div className="message-bubble user-bubble">
                      <p>{item.message}</p>
                    </div>
                    <div className="avatar user-avatar">
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bot Message */}
                <div className="message-row bot-row">
                  <div className="message-content bot-message">
                    <div className="avatar bot-avatar">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <div className="message-bubble bot-bubble">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Form */}
        <div className="chat-input-container">
          <div className="input-wrapper">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              onInput={handleTextareaInput}
              placeholder="Ask a question about your document..."
              className="chat-textarea"
              rows={1}
            />
            <button
              onClick={handleButtonClick}
              disabled={!question.trim()}
              className="send-button"
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
          <p className="input-help">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
