import express from "express";
import albumsController from "../controllers/albumsController.js";

const albumsRouter = express.Router();

// GET
albumsRouter.get("/", albumsController.getAllAlbums);
albumsRouter.get("/:id", albumsController.getAlbumsById);

export { albumsRouter };
