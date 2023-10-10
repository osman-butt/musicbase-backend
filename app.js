import express from "express";
import cors from "cors";
import * as artistsRouterV1 from "./api/v1/artists/artists.js";
import * as albumsRouterV1 from "./api/v1/albums/albums.js";
import * as songsRouterV1 from "./api/v1/songs/songs.js";
import { artistsRouter } from "./api/v2/artists/artists.js";
import { albumsRouter } from "./api/v2/albums/albums.js";
import { songsRouter } from "./api/v2/songs/songs.js";
// import { getArtistName } from "./helpers.js";

// Globals
const port = process.env.PORT || 3000;
const apiVersionV1 = "v1";
const apiVersionV2 = "v2";
// const host = "http://localhost";

// Initialize app
const app = express();

// Middleware
app.use(express.json()); // parse incomming JSON
app.use(cors());

// Version 1 api

// Entry point
app.get(`/api/${apiVersionV1}/`, (req, res) => {
  res.json({ message: "Musicbase API V1" });
});

// Routes
app.use(`/api/${apiVersionV1}/artists`, artistsRouterV1.artistsRouter);
app.use(`/api/${apiVersionV1}/albums`, albumsRouterV1.albumsRouter);
app.use(`/api/${apiVersionV1}/songs`, songsRouterV1.songsRouter);

// Version 2 api

// Entry point
app.get(`/api/${apiVersionV2}/`, (req, res) => {
  res.json({ message: "Musicbase API V2" });
});

// Routes
app.use(`/api/${apiVersionV2}/artists`, artistsRouter);
app.use(`/api/${apiVersionV2}/albums`, albumsRouter);
app.use(`/api/${apiVersionV2}/songs`, songsRouter);

// REDIRECTION TO API
app.get("/", (req, res) => {
  res.status(301).redirect(`/api/${apiVersionV2}/`); // Redirect to '/new-location'
});

// Captures undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    status: "404 - Resource not found",
    message: `Ensure you are using /api/${apiVersionV2}/[RESOURCE]`,
  });
});

app.listen(port, (req, res) => {
  console.log(
    `The server is running on "http://localhost:${port}/api/${apiVersionV2}",
(older version: "http://localhost:${port}/api/${apiVersionV1}")`
  );
});
