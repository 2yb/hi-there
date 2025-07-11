import { useState } from "react";
import styles from "./JournalForm.module.css";

export default function JournalForm({ onSubmit }) {
  const [entry, setEntry] = useState({
    authorName: "",
    content: "",
    mood: "happy",
    partnerName: "",
  });

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(entry);
    setEntry((prev) => ({ ...prev, content: "" })); // Clear only content
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Your Name</label>
          <input
            type="text"
            name="authorName"
            value={entry.authorName}
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
            value={entry.partnerName}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>How are you feeling?</label>
          <select
            name="mood"
            value={entry.mood}
            onChange={handleChange}
            className={styles.selectField}
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
            value={entry.content}
            onChange={handleChange}
            className={styles.textareaField}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Save Entry
        </button>
      </form>
    </div>
  );
}
