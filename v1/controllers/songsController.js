import { query } from "express";
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
  const id = req.params.id;
  const query = /*sql*/ `
        SELECT * FROM songs WHERE songID=?;
    `;
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

function addSong(req, res) {
  const newSong = req.body;
  const values = [newSong.songName];
  const query = /*sql*/ `
    INSERT INTO songs (songName)
    VALUES (?);
    `;
  dbconfig.query(query, values, (error, results, fields) => {
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
  //   res.json({ message: "GET /songs/id is not implemented yet!" });
}

export default {
  getAllSongs,
  getSongsById,
  addSong,
};
