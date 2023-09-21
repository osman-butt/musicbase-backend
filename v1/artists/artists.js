import express from "express";
import artistsController from "./artistsController.js";

const artistsRouter = express.Router();

// GET
artistsRouter.get("/", artistsController.getAllArtists);
artistsRouter.get("/:id", artistsController.getArtistById);
artistsRouter.get("/:id/albums", artistsController.getArtistWithAlbums);
// POST
artistsRouter.post("/", artistsController.addArtist);
// PUT
artistsRouter.put("/:id", artistsController.updateArtist);
// DELETE
artistsRouter.delete("/:id", artistsController.deleteArtist);

export { artistsRouter };
