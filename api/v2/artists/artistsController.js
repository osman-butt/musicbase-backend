import artistsModel from "./artistsModel.js";

async function getArtists(req, res) {
  const { artistName, albumName, songName } = req.query;
  try {
    const data = await artistsModel.getArtists(artistName, albumName, songName);
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
    const data = await artistsModel.getArtistById(values);
    res.json(data);
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
    await artistsModel.updateArtist(values);
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
    await artistsModel.deleteArtist(values);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

export default {
  getArtists,
  getArtistById,
  addArtist,
  updateArtist,
  deleteArtist,
};
