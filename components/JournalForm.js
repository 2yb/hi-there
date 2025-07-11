// pages/journal.js
import { useState, useEffect } from "react";
import JournalForm from "../components/JournalForm";
import JournalList from "../components/JournalList";

export default function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch entries on mount
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/entries");
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Failed to fetch entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (entry) => {
    console.log("Entry saved:");
    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });
      console.log("Entry saved:", entry);

      if (response.ok) {
        fetchEntries(); // Refresh the list
      }
    } catch (error) {
      console.error("Failed to save entry:", error);
    }
  };

  return (
    <div className="journal-container">
      <h1>Our Journal</h1>
      <JournalForm onSubmit={handleSubmit} />
      {loading ? <p>Loading entries...</p> : <JournalList entries={entries} />}
    </div>
  );
}
