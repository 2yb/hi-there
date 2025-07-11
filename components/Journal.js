import { useState, useEffect } from "react";
import JournalForm from "../components/JournalForm";
import JournalList from "../components/JournalList";

export default function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data with auto-refresh
  const fetchEntries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/entries");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load + periodic refresh
  useEffect(() => {
    fetchEntries();
    const interval = setInterval(fetchEntries, 15000); // Refresh every 15s
    return () => clearInterval(interval);
  }, []);

  // Handle form submission
  const handleSubmit = async (entry) => {
    try {
      setLoading(true);
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });

      if (!res.ok) throw new Error("Save failed");
      await fetchEntries(); // Refresh the list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle entry updates
  const handleUpdate = async (id, updates) => {
    try {
      setLoading(true);
      const res = await fetch("/api/entries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });

      if (!res.ok) throw new Error("Update failed");
      await fetchEntries(); // Refresh the list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="journal-container">
      <h1>Our Journal</h1>

      {error && <div className="error">{error}</div>}

      <JournalForm onSubmit={handleSubmit} disabled={loading} />

      {loading && entries.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <JournalList entries={entries} onUpdate={handleUpdate} />
      )}
    </div>
  );
}
