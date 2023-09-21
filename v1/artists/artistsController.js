import artistModel from "./artistsModel.js";
import { formatArtistAlbums } from "../../helpers.js";
import artistsModel from "./artistsModel.js";

async function getAllArtists(req, res) {
  try {
    const data = await artistModel.getAllArtists();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function getArtistById(req, res) {
  const id = req.params.id;
  const values = [id];
  try {
    const data = await artistModel.getArtistById(values);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function getArtistWithAlbums(req, res) {
  const id = req.params.id;
  const values = [id];
  try {
    const data = await artistModel.getArtistWithAlbums(values);
    res.json(formatArtistAlbums(data));
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function addArtist(req, res) {
  const newArtist = req.body;
  const values = [
    newArtist.artistName,
    newArtist.artistImage,
    newArtist.artistDescription,
  ];
  console.log(values);
  try {
    const data = await artistsModel.addArtist(values);
    res.status(201).json({ artistID: data.insertId });
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function updateArtist(req, res) {
  const id = req.params.id;
  const updatedArtist = req.body;
  const values = [
    updatedArtist.artistName,
    updatedArtist.artistImage,
    updatedArtist.artistDescription,
    id,
  ];
  try {
    await artistModel.updateArtist(values);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function deleteArtist(req, res) {
  const id = req.params.id;
  const values = [id];
  try {
    await artistModel.deleteArtist(values);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

export default {
  getAllArtists,
  getArtistById,
  getArtistWithAlbums,
  addArtist,
  updateArtist,
  deleteArtist,
};
