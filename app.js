import express from "express";
import cors from "cors";
import { artistsRouter } from "./api/v1/artists/artists.js";
import { albumsRouter } from "./api/v1/albums/albums.js";
import { songsRouter } from "./api/v1/songs/songs.js";
// import { getArtistName } from "./helpers.js";

// Globals
const port = process.env.PORT || 3000;
const apiVersion = "v1";
// const host = "http://localhost";

// Initialize app
const app = express();

// Middleware
app.use(express.json()); // parse incomming JSON
app.use(cors());

// Entry point
app.get(`/api/${apiVersion}/`, (req, res) => {
  res.json({ me2sage: "Musicbase API" });
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
    `The server is running on "http://localhost:${port}/api/${apiVersion}`
  );
});
