import dbconfig from "../../database.js";
import { formatArtistAlbums } from "../../helpers.js";

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
  const id = req.params.id;
  const query = "SELECT * FROM artists WHERE artistID=?;";
  dbconfig.query(query, [id], (error, results, fields) => {
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

function getArtistWithAlbums(req, res) {
  const id = req.params.id;
  const query = `SELECT artists.artistID, artists.artistName, artists.artistImage,artists.artistDescription, 
    albums.albumID, albums.albumName, albums.albumImage, albums.albumReleaseDate
      FROM artists
      LEFT JOIN artists_albums ON artists.artistID = artists_albums.artistID
      LEFT JOIN albums ON artists_albums.albumID = albums.albumID WHERE artists.artistID=?;`;
  dbconfig.query(query, [id], (error, results, fields) => {
    if (error) {
      res.status(500).json({ message: "500 - Internal server error" });
    } else {
      if (results) {
        res.json(formatArtistAlbums(results));
      } else {
        res.status(404).json({ message: "404 - Could not find resource" });
      }
    }
  });
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
  getArtistWithAlbums,
  addArtist,
  updateArtist,
  deleteArtist,
};
