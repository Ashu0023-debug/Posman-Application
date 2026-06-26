import React, { useEffect, useState } from "react";

const Collections = ({ collections, setCollections }) => {
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  // Fetch existing collections on mount
  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/collections", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setCollections(data);
        } else {
          console.error("Failed to load collections:", data.error);
        }
      } catch (err) {
        console.error("Error fetching collections:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchCollections();
  }, [token, setCollections]);

  // Create a new collection
  const handleNewCollection = async () => {
    const name = prompt("Enter new collection name:");
    if (!name) return;

    try {
      const res = await fetch("http://localhost:5000/api/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to create collection");
        return;
      }

      setCollections((prev) => [...prev, data]);
    } catch (err) {
      console.error("Error creating collection:", err);
      alert("Something went wrong while creating the collection");
    }
  };

  return (
    <div className="collection-section">
      <div className="section-header">
        <p className="section-title">Collections</p>
        <button className="new-btn" onClick={handleNewCollection}>+ New</button>
      </div>

      {loading ? (
        <p style={{ color: "#888" }}>Loading...</p>
      ) : collections.length === 0 ? (
        <p style={{ color: "#888" }}>No collections found</p>
      ) : (
        <ul>
          {collections.map((c) => (
            <li key={c._id || c.name}>{c.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Collections;
