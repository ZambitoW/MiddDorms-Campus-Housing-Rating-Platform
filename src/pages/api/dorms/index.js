import Building from "../../../../models/Building.js";

export default async function handler(req, res) {
  try {
    const dorms = await Building.query();
    res.status(200).json(dorms);
  } catch (error) {
    console.error("Error fetching dorms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
