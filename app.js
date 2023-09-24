import express from "express";
import cors from "cors";
import { artistsRouter } from "./v1/artists/artists.js";
import { albumsRouter } from "./v1/albums/albums.js";
import { songsRouter } from "./v1/songs/songs.js";
// import { getArtistName } from "./helpers.js";

// Globals
const port = process.env.PORT || 8080;
// const host = "http://localhost";

// Initialize app
const app = express();

// Middleware
app.use(express.json()); // parse incomming JSON
app.use(cors());

// Entry point
app.get("/api/v1/", (req, res) => {
  res.json({ message: "Musicbase API" });
});

// Routes
app.use("/api/v1/artists", artistsRouter);
app.use("/api/v1/albums", albumsRouter);
app.use("/api/v1/songs", songsRouter);

// REDIRECTION TO API
app.get("/", (req, res) => {
  res.status(301).redirect("/api/v1/"); // Redirect to '/new-location'
});

// Captures undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    status: "404 - Resource not found",
    message: "Ensure you are using /api/v1/[RESOURCE]",
  });
});

app.listen(port, (req, res) => {
  console.log(`The server is running on "http://localhost:${port}/api/v1"`);
});
