import express from "express";
import albumsController from "./albumsController.js";

const albumsRouter = express.Router();

// GET
albumsRouter.get("/", albumsController.getAlbums);
albumsRouter.get("/:id", albumsController.getAlbumsById);
// POST
albumsRouter.post("/", albumsController.addAlbum);
albumsRouter.post("/artists/songs", albumsController.addAlbumArtistsSongs);

// PUT
albumsRouter.put("/:id", albumsController.updateAlbum);

// DELETE
albumsRouter.delete("/:id", albumsController.deleteAlbum);

export { albumsRouter };
