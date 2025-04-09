const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/api/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing search query" });

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
    q
  )}&lang=en&country=ng&max=5&apikey=${process.env.GNEWS_API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching from GNews API" });
  }
});

app.use(express.static("public"));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
