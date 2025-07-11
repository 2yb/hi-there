import clientPromise from "../../lib/dbConnect";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("nextinput");

    // Test connection by listing collections
    const collections = await db.listCollections().toArray();

    res.status(200).json({
      connected: true,
      database: db.databaseName,
      collections: collections.map((col) => col.name),
    });
  } catch (error) {
    console.error("Connection test failed:", error);
    res.status(500).json({
      connected: false,
      error: error.message,
    });
  }
}
