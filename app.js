import express from "express";
import cors from "cors";
import { artistsRouter } from "./v1/routes/artists.js";
import { albumsRouter } from "./v1/routes/albums.js";
import { songsRouter } from "./v1/routes/songs.js";

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

app.use("/api/v1/artists", artistsRouter);
app.use("/api/v1/albums", albumsRouter);
app.use("/api/v1/songs", songsRouter);

app.listen(port, (req, res) => {
  console.log(`The server is running on "${host}:${port}"`);
});
