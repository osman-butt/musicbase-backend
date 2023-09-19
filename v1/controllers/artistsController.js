import dbconfig from "../../database.js";
import { formatArtistAlbums } from "../../helpers.js";

function getAllArtists(req, res) {
  const query = /*sql*/ `SELECT * FROM artists;`;
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
  const query = /*sql*/ `SELECT * FROM artists WHERE artistID=?;`;
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
  const query = /*sql*/ `
  SELECT artists.artistID, artists.artistName, artists.artistImage,artists.artistDescription, 
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
  const newArtist = req.body;
  console.log(newArtist);
  const values = [
    newArtist.artistName,
    newArtist.artistImage,
    newArtist.artistDescription,
  ];
  const query = /*sql*/ `
    INSERT INTO artists (artistName,artistImage,artistDescription)
    VALUES (?,?,?)`;
  dbconfig.query(query, values, (error, results, fields) => {
    console.log(results);
    if (error) {
      res.status(500).json({ message: "500 - Internal server error" });
    } else {
      if (results) {
        res.json({ artistID: results.insertId });
      } else {
        res.status(404).json({ message: "404 - Could not find resource" });
      }
    }
  });
}

function updateArtist(req, res) {
  res.json({ message: "PUT /artist not implemented" });
}

function deleteArtist(req, res) {
  const id = req.params.id;
  const query = /*sql*/ `DELETE FROM artists WHERE artistID=?;`;
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

export default {
  getAllArtists,
  getArtistById,
  getArtistWithAlbums,
  addArtist,
  updateArtist,
  deleteArtist,
};
