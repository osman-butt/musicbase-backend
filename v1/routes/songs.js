import express from "express";
import songsController from "../controllers/songsController.js";

const songsRouter = express.Router();

// GET
songsRouter.get("/", songsController.getAllSongs);
songsRouter.get("/:id", songsController.getSongsById);
songsRouter.post("/", songsController.addSong);
songsRouter.put("/:id", songsController.updateSong);
songsRouter.put("/:id", songsController.deleteSong);

export { songsRouter };
