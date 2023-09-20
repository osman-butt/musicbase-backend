import express from "express";
import albumsController from "../controllers/albumsController.js";

const albumsRouter = express.Router();

// GET
albumsRouter.get("/", albumsController.getAllAlbums);
albumsRouter.get("/:id", albumsController.getAlbumsById);
albumsRouter.get("/:id/songs", albumsController.getAlbumWithSongs);
albumsRouter.post("/", albumsController.addAlbum);
albumsRouter.put("/:id", albumsController.updateAlbum);
albumsRouter.delete("/:id", albumsController.deleteAlbum);

export { albumsRouter };
