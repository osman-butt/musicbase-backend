import songsModel from "./songsModel.js";
import songsUtils from "./songsUtils.js";

async function getSongs(req, res) {
  try {
    const data = await songsModel.getSongs();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function getSongsAlbumsArtists(req, res) {
  const { artistName, albumName, songName } = req.query;
  try {
    const data = await songsModel.getSongsAlbumsArtists(
      artistName,
      albumName,
      songName
    );
    res.json(songsUtils.formatSongsAlbumsArtists(data));
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function getSongsById(req, res) {
  const id = req.params.id;
  const values = [id];
  try {
    const data = await songsModel.getSongsById(values);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function addSong(req, res) {
  const newSong = req.body;
  const values = [newSong.songName, newSong.songDuration];
  try {
    const data = await songsModel.addSong(values);
    res.status(201).json({ songID: data.insertId });
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function updateSong(req, res) {
  const id = req.params.id;
  const updatedSong = req.body;
  const values = [updatedSong.songName, updatedSong.songDuration, id];
  try {
    await songsModel.updateSong(values);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function deleteSong(req, res) {
  const id = req.params.id;
  const values = [id];
  try {
    await songsModel.deleteSong(values);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

export default {
  getSongs,
  getSongsAlbumsArtists,
  getSongsById,
  addSong,
  updateSong,
  deleteSong,
};

//   res.json({ message: "GET /songs/id is not implemented yet!" });
