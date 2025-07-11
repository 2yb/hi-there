import { useState, useEffect } from "react";
import styles from "../styles/Journal.module.css";

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    authorName: "",
    partnerName: "",
    mood: "happy",
    content: "",
  });

  // Fetch entries from API
  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/entries");
      if (!response.ok) throw new Error("Failed to fetch entries");
      const data = await response.json();
      setEntries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load entries on component mount
  useEffect(() => {
    fetchEntries();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Send data to API
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save entry");

      // Clear form and refresh entries
      setFormData((prev) => ({
        ...prev,
        content: "",
      }));
      await fetchEntries();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Hi There!</h1>
        <p>Share your thoughts and feelings with your partner</p>
        {error && <div className={styles.error}>{error}</div>}
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span>✏️</span> Add New Entry
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Your Name</label>
            <input
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              className={styles.inputField}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Partner's Name</label>
            <input
              type="text"
              name="partnerName"
              value={formData.partnerName}
              onChange={handleChange}
              className={styles.inputField}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>How are you feeling?</label>
            <select
              name="mood"
              value={formData.mood}
              onChange={handleChange}
              className={`${styles.inputField} ${styles.selectField}`}
              disabled={loading}
            >
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="excited">Excited</option>
              <option value="loved">Loved</option>
              <option value="lonely">Lonely</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Journal Entry</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className={`${styles.inputField} ${styles.textareaField}`}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Entry"}
          </button>
        </form>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span>📖</span> Our Journal
        </h2>
        {loading && entries.length === 0 ? (
          <div className={styles.emptyState}>Loading entries...</div>
        ) : entries.length > 0 ? (
          entries.map((entry) => (
            <div key={entry._id} className={styles.entryCard}>
              <div className={styles.entryHeader}>
                <span className={styles.entryAuthor}>{entry.authorName}</span>
                <span className={styles.entryDate}>
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className={styles.moodIndicator}>
                <span>{getMoodEmoji(entry.mood)}</span>
                <span>{entry.mood}</span>
              </div>
              <p className={styles.entryContent}>{entry.content}</p>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            No entries yet. Start by adding your first entry!
          </div>
        )}
      </section>
    </div>
  );
}

function getMoodEmoji(mood) {
  const emojis = {
    happy: "😊",
    sad: "😢",
    excited: "😃",
    loved: "🥰",
    lonely: "😔",
  };
  return emojis[mood] || "😊";
}
