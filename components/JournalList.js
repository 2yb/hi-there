import styles from "./JournalList.module.css";

export default function JournalList({ entries }) {
  const getMoodEmoji = (mood) => {
    const emojis = {
      happy: "😊",
      sad: "😢",
      excited: "😃",
      loved: "🥰",
      lonely: "😔",
    };
    return emojis[mood] || "😊";
  };

  return (
    <div className={styles.entriesContainer}>
      {entries.map((entry) => (
        <div key={entry._id} className={styles.entryCard}>
          <div className={styles.entryHeader}>
            <h3 className={styles.authorName}>{entry.authorName}</h3>
            <span className={styles.entryDate}>
              {new Date(entry.date).toLocaleDateString()}
            </span>
          </div>

          <div className={styles.moodContainer}>
            <span className={styles.moodEmoji}>{getMoodEmoji(entry.mood)}</span>
            <span className={styles.moodText}>{entry.mood}</span>
          </div>

          <p className={styles.entryContent}>{entry.content}</p>
        </div>
      ))}
    </div>
  );
}
