import dbconfig from "../../database.js";
import { formatAlbums, formatAlbumSongs } from "../../helpers.js";

function getAllAlbums(req, res) {
  const query = /*sql*/ `
    SELECT albums.*, artists.artistName as artistNames, artists.artistID FROM albums
        LEFT JOIN artists_albums on albums.albumID = artists_albums.albumID
        LEFT JOIN artists on artists_albums.artistID = artists.artistID;
  `;
  dbconfig.query(query, (error, results, fields) => {
    if (error) {
      res.status(500).json({ message: "500 - Internal server error" });
    } else {
      if (results) {
        // res.json(results);
        res.json(formatAlbums(results));
      } else {
        res.status(404).json({ message: "404 - Could not find resource" });
      }
    }
  });
}

function getAlbumsById(req, res) {
  const id = req.params.id;
  const query = /*sql*/ `
    SELECT albums.*, artists.artistName as artistNames, artists.artistID FROM albums
        LEFT JOIN artists_albums on albums.albumID = artists_albums.albumID
        LEFT JOIN artists on artists_albums.artistID = artists.artistID
        WHERE albums.albumID=?;
  `;
  dbconfig.query(query, [id], (error, results, fields) => {
    if (error) {
      res.status(500).json({ message: "500 - Internal server error" });
    } else {
      if (results) {
        res.json(formatAlbums(results));
      } else {
        res.status(404).json({ message: "404 - Could not find resource" });
      }
    }
  });
}

function getAlbumWithSongs(req, res) {
  const id = req.params.id;
  const query = /*sql*/ `
        SELECT albums.*, artists.artistName as artistNames, artists.artistID, songs.* FROM albums
            LEFT JOIN artists_albums on albums.albumID = artists_albums.albumID
            LEFT JOIN artists on artists_albums.artistID = artists.artistID
            LEFT JOIN albums_songs on albums.albumID = albums_songs.albumID
            LEFT JOIN songs on albums_songs.songID = songs.songID
            WHERE albums.albumID=?;
    `;
  dbconfig.query(query, [id], (error, results, fields) => {
    if (error) {
      res.status(500).json({ message: "500 - Internal server error" });
    } else {
      if (results) {
        res.json(formatAlbumSongs(results));
      } else {
        res.status(404).json({ message: "404 - Could not find resource" });
      }
    }
  });
  //   res.json({ message: "GET /albums/:id/songs not implemented yet!" });
}

export default {
  getAllAlbums,
  getAlbumsById,
  getAlbumWithSongs,
};
