import express from "express";
import songsController from "../controllers/songsController.js";

const songsRouter = express.Router();

// GET
songsRouter.get("/", songsController.getAllSongs);
songsRouter.get("/:id", songsController.getSongsById);
songsRouter.post("/", songsController.addSong);

export { songsRouter };
