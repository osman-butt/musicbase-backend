import express from "express";
import artistsController from "../controllers/artistsController.js";

const artistsRouter = express.Router();

// GET
artistsRouter.get("/", artistsController.getAllArtists);
artistsRouter.get("/:id", artistsController.getArtistById);
artistsRouter.get("/:id/albums", artistsController.getArtistWithAlbums);
// artistsRouter.get(
//   "/:artistId/albums/:albumId/songs",
//   artistsController.getArtistWithAlbumAndSongs
// );
// POST
artistsRouter.post("/", artistsController.addArtist);
// PUT
artistsRouter.put("/:id", artistsController.updateArtist);
// DELETE
artistsRouter.delete("/:id", artistsController.deleteArtist);

export { artistsRouter };
