import express from "express";
import albumsController from "./albumsController.js";

const albumsRouter = express.Router();

// GET
albumsRouter.get("/", albumsController.getAlbums);
albumsRouter.get("/artists", albumsController.getAlbumsArtists);
albumsRouter.get("/:id", albumsController.getAlbumsById);
albumsRouter.get("/:id/artists", albumsController.getAlbumsByIdArtists);
albumsRouter.get("/:id/songs", albumsController.getAlbumsByIdSongs);
albumsRouter.get(
  "/:id/artists/songs",
  albumsController.getAlbumsByIdArtistsSongs
);
// POST
albumsRouter.post("/", albumsController.addAlbum);
albumsRouter.post("/artists/songs", albumsController.addAlbumArtistsSongs);

// PUT
albumsRouter.put("/:id", albumsController.updateAlbum);
// DELETE
albumsRouter.delete("/:id", albumsController.deleteAlbum);

export { albumsRouter };
