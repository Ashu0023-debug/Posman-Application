import React, { useState } from "react";

const Environments = () => {
  const [environments, setEnvironments] = useState([
    { name: "No environment" },
    { name: "Development" },
    { name: "Production" },
  ]);

  const handleAddEnv = () => {
    const name = prompt("Enter environment name:");
    if (name) setEnvironments([...environments, { name }]);
  };

  return (
    <div className="env-section">
      <div className="section-header">
        <p className="section-title">Environments</p>
        <button className="new-btn" onClick={handleAddEnv}>
          + New
        </button>
      </div>
      <ul>
        {environments.map((env, idx) => (
          <li key={idx}>{env.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Environments;
