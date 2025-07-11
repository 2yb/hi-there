import { useState, useEffect } from "react";
import styles from "../styles/Journal.module.css";

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    authorName: "",
    partnerName: "",
    mood: "happy",
    content: "",
  });

  useEffect(() => {
    // Simulate loading entries
    setTimeout(() => {
      setEntries([]); // Empty array for "no entries" state
    }, 500);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save to your backend here
    alert("Entry saved! (Backend not connected in this example)");
    setFormData({
      ...formData,
      content: "",
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Hi There!</h1>
        <p>Share your thoughts and feelings with your partner</p>
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
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>How are you feeling?</label>
            <select
              name="mood"
              value={formData.mood}
              onChange={handleChange}
              className={`${styles.inputField} ${styles.selectField}`}
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
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Save Entry
          </button>
        </form>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span>📖</span> Our Journal
        </h2>
        {entries.length > 0 ? (
          entries.map((entry) => (
            <div key={entry.id} className={styles.entryCard}>
              <div className={styles.entryHeader}>
                <span className={styles.entryAuthor}>{entry.authorName}</span>
                <span className={styles.entryDate}>
                  {new Date(entry.date).toLocaleDateString()}
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
