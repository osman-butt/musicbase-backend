import connection from "../../database.js";
import { formatArtistAlbums, formatArtistAlbumSongs } from "../../helpers.js";

async function getAllArtists(req, res) {
  const query = /*sql*/ `SELECT * FROM artists;`;
  try {
    const [rows, fields] = await connection.execute(query);
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function getArtistById(req, res) {
  const id = req.params.id;
  const values = [id];
  const query = /*sql*/ `SELECT * FROM artists WHERE artistID=?;`;
  try {
    const [rows, fields] = await connection.execute(query, values);
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function getArtistWithAlbums(req, res) {
  const id = req.params.id;
  const values = [id];
  const query = /*sql*/ `
  SELECT artists.artistID, artists.artistName, artists.artistImage,artists.artistDescription, 
  albums.albumID, albums.albumName, albums.albumImage, albums.albumReleaseDate
      FROM artists
      LEFT JOIN artists_albums ON artists.artistID = artists_albums.artistID
      LEFT JOIN albums ON artists_albums.albumID = albums.albumID WHERE artists.artistID=?;`;
  try {
    const [rows, fields] = await connection.execute(query, values);
    res.json(formatArtistAlbums(rows));
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

function getArtistWithAlbumAndSongs(req, res) {
  const artistId = req.params.artistId;
  const albumId = req.params.albumId;
  const query = /*sql*/ `
    SELECT artists.*, albums.albumID,albums.albumName,albums.albumImage,albums.albumReleaseDate, songs.*
        FROM artists
        LEFT JOIN artists_albums ON artists.artistID = artists_albums.artistID
        LEFT JOIN albums ON artists_albums.albumID = albums.albumID
        LEFT JOIN albums_songs ON albums.albumID = albums_songs.albumID
        LEFT JOIN songs ON albums_songs.songID = songs.songID
        WHERE artists.artistID=? AND albums.albumID=?`;
  dbconfig.query(query, [artistId, albumId], (error, results, fields) => {
    if (error) {
      res
        .status(500)
        .json({ message: "500 - Internal server error", error: error });
    } else {
      if (results) {
        res.json(formatArtistAlbumSongs(results));
        // res.json(results);
      } else {
        res.status(404).json({ message: "404 - Could not find resource" });
      }
    }
  });
}

async function addArtist(req, res) {
  const newArtist = req.body;
  const values = [
    newArtist.artistName,
    newArtist.artistImage,
    newArtist.artistDescription,
  ];
  const addQuery = /*sql*/ `
    INSERT INTO artists (artistName,artistImage,artistDescription)
    VALUES (?,?,?)`;
  const getQuery = /*sql*/ `
    SELECT * FROM artists WHERE artistID=?;
  `;
  try {
    // create row in database
    const [newRow] = await connection.execute(addQuery, values);
    // get the new row based on the provided id & return to client
    const [rows, fields] = await connection.execute(getQuery, [
      newRow.insertId,
    ]);
    res.status(201).json(rows);
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function updateArtist(req, res) {
  const id = req.params.id;
  const updatedArtist = req.body;
  const values = [
    updatedArtist.artistName,
    updatedArtist.artistImage,
    updatedArtist.artistDescription,
    id,
  ];
  const updateQuery = /*sql*/ `UPDATE artists SET artistName=?, artistImage=?, artistDescription=? WHERE artists.artistID=?;`;
  const getQuery = /*sql*/ `
    SELECT * FROM artists WHERE artistID=?;
  `;
  try {
    // update database
    await connection.execute(updateQuery, values);
    // get the updated row and send it to client
    const [rows, fields] = await connection.execute(getQuery, [id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function deleteArtist(req, res) {
  const id = req.params.id;
  const values = [id];
  const deleteQuery = /*sql*/ `DELETE FROM artists WHERE artistID=?;`;
  const getQuery = /*sql*/ `
    SELECT * FROM artists;
  `;
  try {
    // delete from database
    await connection.execute(deleteQuery, values);
    // get the updated list and send it to client
    const [rows, fields] = await connection.execute(getQuery, values);
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

export default {
  getAllArtists,
  getArtistById,
  getArtistWithAlbums,
  // getArtistWithAlbumAndSongs,
  addArtist,
  updateArtist,
  deleteArtist,
};
