import express from "express";
import cors from "cors";

// Globals
const port = 3000;
const host = "http://localhost";

// Initialize app
const app = express();

// Middleware
app.use(express.json()); // parse incomming JSON

app.get("/", (req, res) => {
  res.json({ message: "Musicbase API" });
});

app.listen(port, (req, res) => {
  console.log(`The server is running on "${host}:${port}"`);
});
