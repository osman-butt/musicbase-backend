import express from "express";
import songsController from "./songsController.js";

const songsRouter = express.Router();

// GET
songsRouter.get("/", songsController.getSongs);
songsRouter.get("/:id", songsController.getSongsById);
songsRouter.post("/", songsController.addSong);
songsRouter.put("/:id", songsController.updateSong);
songsRouter.delete("/:id", songsController.deleteSong);

export { songsRouter };
