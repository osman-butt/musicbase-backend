import albumsUtils from "./albumsUtils.js";
import albumsModel from "./albumsModel.js";

async function getAllAlbums(req, res) {
  try {
    const data = await albumsModel.getAllAlbums();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function getAlbumsById(req, res) {
  const id = req.params.id;
  const values = [id];
  try {
    const data = await albumsModel.getAlbumsById(values);
    // res.json(formatAlbums(data));
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function getAlbumArtists(req, res) {
  const id = req.params.id;
  const values = [id];
  try {
    const data = await albumsModel.getAlbumArtists(values);
    res.json(albumsUtils.formatAlbumArtists(data));
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function getAlbumSongs(req, res) {
  const id = req.params.id;
  const values = [id];

  try {
    const data = await albumsModel.getAlbumSongs(values);
    res.json(albumsUtils.formatAlbumSongs(data));
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function addAlbum(req, res) {
  const newAlbum = req.body;
  const values = [
    newAlbum.albumName,
    newAlbum.albumImage,
    newAlbum.albumReleaseDate,
  ];

  try {
    const data = await albumsModel.addAlbum(values);
    res.status(201).json({ albumID: data.insertId });
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function updateAlbum(req, res) {
  const id = req.params.id;
  const updatedAlbum = req.body;
  const values = [
    updatedAlbum.albumName,
    updatedAlbum.albumImage,
    updatedAlbum.albumReleaseDate,
    id,
  ];

  try {
    await albumsModel.updateAlbum(values);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function deleteAlbum(req, res) {
  const id = req.params.id;
  const values = [id];

  try {
    await albumsModel.deleteAlbum(values);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

export default {
  getAllAlbums,
  getAlbumsById,
  getAlbumArtists,
  getAlbumSongs,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};
