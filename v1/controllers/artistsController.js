import dbconfig from "../../database.js";

function getAllArtists(req, res) {
  const query = "SELECT * FROM artists;";
  dbconfig.query(query, (error, results, fields) => {
    if (error) {
      res.status(500).json({ message: "500 - Internal server error" });
    } else {
      if (results) {
        res.json(results);
      } else {
        res.status(404).json({ message: "404 - Could not find resource" });
      }
    }
  });
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
