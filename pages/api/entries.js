import clientPromise from "../../lib/dbConnect";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextinput");
  const collection = db.collection("hi-there");

  try {
    // CREATE ENTRY (POST)
    if (req.method === "POST") {
      const { authorName, content, mood = "happy" } = req.body;

      // Validation
      if (!authorName || !content) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Insert with timestamp
      const result = await collection.insertOne({
        authorName,
        content,
        mood,
        createdAt: new Date(),
        updatedAt: new Date(), // New field for updates
      });

      // Return the full created document
      const newEntry = await collection.findOne({ _id: result.insertedId });
      return res.status(201).json(newEntry);
    }

    // UPDATE ENTRY (PUT)
    if (req.method === "PUT") {
      const { id, content, mood } = req.body;

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { content, mood, updatedAt: new Date() } }
      );

      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: "Entry not found" });
      }

      const updatedEntry = await collection.findOne({ _id: new ObjectId(id) });
      return res.status(200).json(updatedEntry);
    }

    // GET ALL ENTRIES (GET)
    if (req.method === "GET") {
      const entries = await collection.find().sort({ createdAt: -1 }).toArray();
      return res.status(200).json(entries);
    }

    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({
      error: "Operation failed",
      details: error.message,
    });
  }
}
