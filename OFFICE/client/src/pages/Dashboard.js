import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../component/PostmanUI.css";
import Collections from "../component/collection";
import Environments from "../component/Environment";
import History from "../component/History";

const Dashboard = () => {
  const navigate = useNavigate();

  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  const [collections, setCollections] = useState([
    {
      name: "My First Collection",
      expanded: true,
      requests: ["GET Users", "POST Login"],
    },
  ]);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("Params");
  const [params, setParams] = useState([{ key: "", value: "" }]);
  const [headers, setHeaders] = useState([{ key: "", value: "" }]);
  const [auth, setAuth] = useState({ type: "No Auth", token: "" });
  const [body, setBody] = useState("");
  const [tests, setTests] = useState("");
  const [settings, setSettings] = useState({ timeout: 0 });
  const [loading, setLoading] = useState(false);

  const convertToObject = (arr) =>
    Array.isArray(arr)
      ? arr.reduce((acc, { key, value }) => {
          if (key.trim() !== "") acc[key] = value;
          return acc;
        }, {})
      : {};

  const handleSend = async () => {
    if (!url.trim()) return alert("Please enter a URL!");

    setLoading(true);
    setResponse("");

    try {
      const query = new URLSearchParams(convertToObject(params)).toString();
      const fullUrl =
        query && ["GET", "DELETE"].includes(method)
          ? `${url}?${query}`
          : url;

      const requestHeaders = convertToObject(headers);

      if (auth.type === "Bearer Token" && auth.token) {
        requestHeaders["Authorization"] = `Bearer ${auth.token}`;
      }

      if (!requestHeaders["Content-Type"]) {
        requestHeaders["Content-Type"] = "application/json";
      }

      const options = { method, headers: requestHeaders };

      if (!["GET", "DELETE"].includes(method)) {
        try {
          options.body = JSON.stringify(JSON.parse(body));
        } catch {
          options.body = body;
        }
      }

      const res = await fetch(fullUrl, options);
      const text = await res.text();

      try {
        const json = JSON.parse(text);
        setResponse(JSON.stringify(json, null, 2));
      } catch {
        setResponse(text);
      }

      const newHistory = [
        { method, url: fullUrl, time: new Date().toLocaleTimeString() },
        ...history,
      ];
      setHistory(newHistory);
      localStorage.setItem("history", JSON.stringify(newHistory));
    } catch (err) {
      setResponse("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleHistoryClick = (item) => {
    setMethod(item.method);
    setUrl(item.url);
  };

  useEffect(() => {
    if (!Array.isArray(collections)) setCollections([]);
  }, [collections]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Params":
        return (
          <div className="tab-content fade-in">
            {params.map((p, i) => (
              <div key={i} className="key-value-row">
                <input
                  placeholder="Key"
                  value={p.key}
                  onChange={(e) => {
                    const updated = [...params];
                    updated[i].key = e.target.value;
                    setParams(updated);
                  }}
                />
                <input
                  placeholder="Value"
                  value={p.value}
                  onChange={(e) => {
                    const updated = [...params];
                    updated[i].value = e.target.value;
                    setParams(updated);
                  }}
                />
              </div>
            ))}
            <button
              className="add-btn"
              onClick={() => setParams([...params, { key: "", value: "" }])}
            >
              + Add Param
            </button>
          </div>
        );

      case "Authorization":
        return (
          <div className="tab-content fade-in">
            <select
              value={auth.type}
              onChange={(e) => setAuth({ ...auth, type: e.target.value })}
            >
              <option>No Auth</option>
              <option>Bearer Token</option>
            </select>
            {auth.type === "Bearer Token" && (
              <input
                type="text"
                placeholder="Enter Bearer Token"
                value={auth.token}
                onChange={(e) =>
                  setAuth({ ...auth, token: e.target.value })
                }
              />
            )}
          </div>
        );

      case "Headers":
        return (
          <div className="tab-content fade-in">
            {headers.map((h, i) => (
              <div key={i} className="key-value-row">
                <input
                  placeholder="Key"
                  value={h.key}
                  onChange={(e) => {
                    const updated = [...headers];
                    updated[i].key = e.target.value;
                    setHeaders(updated);
                  }}
                />
                <input
                  placeholder="Value"
                  value={h.value}
                  onChange={(e) => {
                    const updated = [...headers];
                    updated[i].value = e.target.value;
                    setHeaders(updated);
                  }}
                />
              </div>
            ))}
            <button
              className="add-btn"
              onClick={() =>
                setHeaders([...headers, { key: "", value: "" }])
              }
            >
              + Add Header
            </button>
          </div>
        );

      case "Body":
        return (
          <div className="tab-content fade-in">
            <textarea
              rows={10}
              placeholder='Enter JSON or raw body (e.g. {"name":"Ashish"})'
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        );

      case "Tests":
        return (
          <div className="tab-content fade-in">
            <textarea
              rows={10}
              placeholder="Write JavaScript test scripts (optional)"
              value={tests}
              onChange={(e) => setTests(e.target.value)}
            />
          </div>
        );

      case "Settings":
        return (
          <div className="tab-content fade-in">
            <label>Request Timeout (ms)</label>
            <input
              type="number"
              value={settings.timeout}
              onChange={(e) =>
                setSettings({ ...settings, timeout: e.target.value })
              }
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>My Workspace ⚡</h3>
        <Collections
          collections={Array.isArray(collections) ? collections : []}
          setCollections={setCollections}
        />
        <Environments />
        <History history={history} onClickHistory={handleHistoryClick} />

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </aside>

      {/* Main Panel */}
      <main className="main-content">
        <div className="request-bar">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="method-select"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>

          <input
            type="text"
            placeholder="Enter request URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="url-input"
          />

          <button
            onClick={handleSend}
            className={`send-btn ${loading ? "sending" : ""}`}
          >
            {loading ? "Sending..." : "Send 🚀"}
          </button>
        </div>

        <div className="tabs">
          {["Params", "Authorization", "Headers", "Body", "Tests", "Settings"].map(
            (tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {renderTabContent()}

        <div className="response-area fade-in">
          <h4>Response</h4>
          <pre className="response-box">
            {response || "⚡ Enter a URL and click Send to view response"}
          </pre>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
