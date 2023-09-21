import express from "express";
import albumsController from "./albumsController.js";

const albumsRouter = express.Router();

// GET
albumsRouter.get("/", albumsController.getAllAlbums);
albumsRouter.get("/:id", albumsController.getAlbumsById);
albumsRouter.get("/:id/artists", albumsController.getAlbumArtists);
albumsRouter.get("/:id/songs", albumsController.getAlbumSongs);
// POST
albumsRouter.post("/", albumsController.addAlbum);
// PUT
albumsRouter.put("/:id", albumsController.updateAlbum);
// DELETE
albumsRouter.delete("/:id", albumsController.deleteAlbum);

export { albumsRouter };
