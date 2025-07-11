import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema({
  appName: { type: String, default: "couples_journal" }, // Tag entries
  authorName: { type: String, required: true },
  content: { type: String, required: true },
  mood: { type: String, default: "happy" },
  date: { type: Date, default: Date.now },
  // ... other fields
});

export default mongoose.models.Entry || mongoose.model("Entry", EntrySchema);
