import dbconfig from "../../database.js";
import { formatAlbumsArtists } from "../../helpers.js";

function getAllAlbums(req, res) {
  const query = /*sql*/ `
    SELECT albums.*, artists.artistName as artistNames FROM albums
        LEFT JOIN artists_albums on albums.albumID = artists_albums.albumID
        LEFT JOIN artists on artists_albums.artistID = artists.artistID;
  `;
  dbconfig.query(query, (error, results, fields) => {
    if (error) {
      res.status(500).json({ message: "500 - Internal server error" });
    } else {
      if (results) {
        res.json(formatAlbumsArtists(results));
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
