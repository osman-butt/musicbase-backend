import dbconfig from "../../database.js";

function getAllArtists(req, res) {
  res.json({ message: "GET /artist not implemented" });
}

function getArtistById(req, res) {
  res.json({ message: "GET /artist/:id not implemented" });
}

function addArtist(req, res) {
  res.json({ message: "POST /artist not implemented" });
}

function updateArtist(req, res) {
  res.json({ message: "PUT /artist not implemented" });
}

function deleteArtist(req, res) {
  res.json({ message: "DELETE /artist not implemented" });
}

export default {
  getAllArtists,
  getArtistById,
  addArtist,
  updateArtist,
  deleteArtist,
};
