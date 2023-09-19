import dbconfig from "../../database.js";
import { formatArtistAlbums, formatArtistAlbumSongs } from "../../helpers.js";

function getAllAlbums(req, res) {
  const query = /*sql*/ `SELECT * FROM albums;`;
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

function getAlbumsById(req, res) {
  res.json({ message: "GET /albums/:id not implemented yet" });
}

export default {
  getAllAlbums,
  getAlbumsById,
};
