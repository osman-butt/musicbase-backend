import express from "express";
import cors from "cors";
import { artistsRouter } from "./api/v2/artists/artists.js";
import { albumsRouter } from "./api/v2/albums/albums.js";
import { songsRouter } from "./api/v2/songs/songs.js";

// Globals
const port = process.env.PORT || 8080;
const apiVersion = "v2";

// Initialize app
const app = express();

// Middleware
app.use(express.json()); // parse incomming JSON
app.use(cors());

// Entry point
app.get(`/api/${apiVersion}/`, (req, res) => {
  res.json({ message: "Musicbase API V2" });
});

// Routes
app.use(`/api/${apiVersion}/artists`, artistsRouter);
app.use(`/api/${apiVersion}/albums`, albumsRouter);
app.use(`/api/${apiVersion}/songs`, songsRouter);

// REDIRECTION TO API
app.get("/", (req, res) => {
  res.status(301).redirect(`/api/${apiVersion}/`); // Redirect to '/new-location'
});

// Captures undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    status: "404 - Resource not found",
    message: `Ensure you are using /api/${apiVersion}/[RESOURCE]`,
  });
});

app.listen(port, (req, res) => {
  console.log(
    `The server is running on "http://localhost:${port}/api/${apiVersion}"`
  );
});
