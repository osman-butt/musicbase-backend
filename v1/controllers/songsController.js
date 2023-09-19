import dbconfig from "../../database.js";

function getAllSongs(req, res) {
  const query = /*sql*/ `
        SELECT * FROM songs;
    `;
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

function getSongsById(req, res) {
  res.json({ message: "GET /songs/id is not implemented yet!" });
}

export default {
  getAllSongs,
  getSongsById,
};
