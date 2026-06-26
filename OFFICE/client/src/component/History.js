import React from "react";

const History = ({ history, onClickHistory }) => {
  return (
    <div className="history-section">
      <div className="section-header">
        <p className="section-title">History</p>
      </div>

      {history.length === 0 ? (
        <p className="empty-text">No history yet</p>
      ) : (
        <ul>
          {history.map((h, i) => (
            <li key={i} onClick={() => onClickHistory(h)}>
              <span className="method-tag">{h.method}</span>{" "}
              {h.url.length > 30 ? h.url.slice(0, 30) + "..." : h.url}{" "}
              <small style={{ color: "#777" }}>({h.time})</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
