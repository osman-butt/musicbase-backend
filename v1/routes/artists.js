import express from "express";
import artistsController from "../controllers/artistsController.js";

const artistsRouter = express.Router();

artistsRouter.get("/", artistsController.getAllArtists);
artistsRouter.get("/:id", artistsController.getArtistById);
artistsRouter.post("/", artistsController.addArtist);
artistsRouter.put("/:id", artistsController.updateArtist);
artistsRouter.delete("/:id", artistsController.deleteArtist);

export { artistsRouter };
