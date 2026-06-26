import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./PostmanUI.css";

const PostmanUI = () => {
  const [user, setUser] = useState(null);
  const [requestName, setRequestName] = useState("");       
  const [collectionId, setCollectionId] = useState(1);      
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [activeTab, setActiveTab] = useState("Params");
  const [params, setParams] = useState([{ key: "", value: "" }]);
  const [headers, setHeaders] = useState([{ key: "", value: "" }]);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState(null);
  const [time, setTime] = useState(null);
  const [savedRequests, setSavedRequests] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) window.location.href = "/login";
    else setUser(loggedInUser);

    loadSavedRequests();
  }, []);

  const convertToObject = arr => {
    const obj = {};
    arr.forEach(item => { if(item.key) obj[item.key] = item.value; });
    return obj;
  };

  const addRow = (arr, setArr) => setArr([...arr, { key: "", value: "" }]);
  const removeRow = (arr, setArr, idx) => setArr(arr.filter((_, i) => i !== idx));
  const updateRow = (arr, setArr, idx, field, value) => {
    const newArr = [...arr];
    newArr[idx][field] = value;
    setArr(newArr);
  };

  // Send API request
  const sendRequest = async () => {
    const start = performance.now();
    try {
      const query = new URLSearchParams(convertToObject(params)).toString();
      const requestHeaders = convertToObject(headers);
      if (!requestHeaders["Content-Type"] && !["GET","DELETE"].includes(method)) {
        requestHeaders["Content-Type"] = "application/json";
      }

      const res = await fetch(url + (query ? `?${query}` : ""), {
        method,
        headers: requestHeaders,
        body: ["GET","DELETE"].includes(method) ? null : body
      });

      const text = await res.text();
      try { setResponse(JSON.stringify(JSON.parse(text), null, 2)); }
      catch { setResponse(text); }

      setStatus(res.status + " " + res.statusText);
    } catch(err) {
      setResponse(err.message);
      setStatus("Error");
    }
    setTime((performance.now() - start).toFixed(2) + " ms");
  };

  // Save request to backend
  const saveRequest = async () => {
    if (!requestName || !url || !collectionId) {
      alert("Name, URL, and Collection are required!");
      return;
    }

    const payload = {
      name: requestName,
      collection_id: collectionId,
      url,
      method,
      params,
      headers,
      body
    };

    try {
      const res = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        alert("Error: " + data.error);
      } else {
        alert("Request saved successfully!");
        loadSavedRequests();
      }
    } catch(err) {
      console.error(err);
      alert("Network Error: " + err.message);
    }
  };

  // Load saved requests
  const loadSavedRequests = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/requests");
      const data = await res.json();
      setSavedRequests(Array.isArray(data) ? data : []);
    } catch(err) {
      console.error(err);
      setSavedRequests([]);
    }
  };

  const loadRequest = req => {
    setRequestName(req.name);
    setCollectionId(req.collection_id);
    setMethod(req.method);
    setUrl(req.url);
    setParams(req.params);
    setHeaders(req.headers);
    setBody(req.body);
    setActiveTab("Params");
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="postman-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h4>{user?.name}</h4>
          <p>{user?.email}</p>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>

        <h4>Saved Requests</h4>
        <div className="requests-list">
          {savedRequests.map((req, idx) => (
            <div key={idx} className="request-item" onClick={() => loadRequest(req)}>
              {req.method} {req.url}
            </div>
          ))}
        </div>
      </div>

      <div className="main-panel">
        <div className="top-bar">
          <input
            type="text"
            placeholder="Request Name"
            value={requestName}
            onChange={e => setRequestName(e.target.value)}
            style={{ marginRight: "5px" }}
          />
          <select value={collectionId} onChange={e => setCollectionId(Number(e.target.value))} style={{ marginRight: "5px" }}>
            <option value={1}>Default Collection</option>
            {/* Add more collections dynamically if available */}
          </select>
          <select value={method} onChange={e => setMethod(e.target.value)} style={{ marginRight: "5px" }}>
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
          <input type="text" placeholder="Enter request URL" value={url} onChange={e => setUrl(e.target.value)} style={{ flex: 1, marginRight: "5px" }} />
          <button className="send-btn" onClick={sendRequest}>Send</button>
          <button onClick={saveRequest} style={{ marginLeft: "5px" }}>Save Request</button>
        </div>

        <div className="tabs">
          {["Params", "Headers", "Body"].map(tab => (
            <button key={tab} className={activeTab === tab ? "tab active" : "tab"} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === "Params" && (
            <div className="table-section">
              {params.map((row, idx) => (
                <div className="table-row" key={idx}>
                  <input placeholder="Key" value={row.key} onChange={e => updateRow(params, setParams, idx, "key", e.target.value)} />
                  <input placeholder="Value" value={row.value} onChange={e => updateRow(params, setParams, idx, "value", e.target.value)} />
                  <button onClick={() => removeRow(params, setParams, idx)}>X</button>
                </div>
              ))}
              <button onClick={() => addRow(params, setParams)}>+ Add Param</button>
            </div>
          )}
          {activeTab === "Headers" && (
            <div className="table-section">
              {headers.map((row, idx) => (
                <div className="table-row" key={idx}>
                  <input placeholder="Key" value={row.key} onChange={e => updateRow(headers, setHeaders, idx, "key", e.target.value)} />
                  <input placeholder="Value" value={row.value} onChange={e => updateRow(headers, setHeaders, idx, "value", e.target.value)} />
                  <button onClick={() => removeRow(headers, setHeaders, idx)}>X</button>
                </div>
              ))}
              <button onClick={() => addRow(headers, setHeaders)}>+ Add Header</button>
            </div>
          )}
          {activeTab === "Body" && (
            <textarea placeholder="JSON Body" value={body} onChange={e => setBody(e.target.value)} />
          )}
        </div>

        <div className="response-panel">
          <div className="response-info">
            <span>Status: {status || "-"}</span>
            <span>Time: {time || "-"}</span>
          </div>
          <SyntaxHighlighter language="json" style={coy} wrapLongLines>
            {response || "// Response will appear here"}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default PostmanUI;
