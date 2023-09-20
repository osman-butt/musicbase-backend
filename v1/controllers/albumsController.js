import connection from "../../database.js";
import { formatAlbums, formatAlbumSongs } from "../../helpers.js";

async function getAllAlbums(req, res) {
  const query = /*sql*/ `
    SELECT albums.*, artists.artistName as artistNames, artists.artistID FROM albums
        LEFT JOIN artists_albums on albums.albumID = artists_albums.albumID
        LEFT JOIN artists on artists_albums.artistID = artists.artistID;
  `;
  try {
    const [rows, fields] = await connection.execute(query);
    res.json(formatAlbums(rows));
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function getAlbumsById(req, res) {
  const id = req.params.id;
  const values = [id];
  const query = /*sql*/ `
    SELECT albums.*, artists.artistName as artistNames, artists.artistID FROM albums
        LEFT JOIN artists_albums on albums.albumID = artists_albums.albumID
        LEFT JOIN artists on artists_albums.artistID = artists.artistID
        WHERE albums.albumID=?;
  `;
  try {
    const [rows, fields] = await connection.execute(query, values);
    res.json(formatAlbums(rows));
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function getAlbumWithSongs(req, res) {
  const id = req.params.id;
  const values = [id];
  const query = /*sql*/ `
        SELECT albums.*, artists.artistName as artistNames, artists.artistID, songs.* FROM albums
            LEFT JOIN artists_albums on albums.albumID = artists_albums.albumID
            LEFT JOIN artists on artists_albums.artistID = artists.artistID
            LEFT JOIN albums_songs on albums.albumID = albums_songs.albumID
            LEFT JOIN songs on albums_songs.songID = songs.songID
            WHERE albums.albumID=?;
    `;
  try {
    const [rows, fields] = await connection.execute(query, values);
    res.json(formatAlbumSongs(rows));
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function addAlbum(req, res) {
  const newAlbum = req.body;
  const values = [
    newAlbum.albumName,
    newAlbum.albumImage,
    newAlbum.albumReleaseDate,
  ];
  console.log(values);
  const addQuery = /*sql*/ `
      INSERT INTO albums (albumName,albumImage,albumReleaseDate)
      VALUES (?,?,?)
    `;
  const getQuery = /*sql*/ `
    SELECT * FROM albums WHERE albumID=?;
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
  //   res.json({ message: "POST /albums not implemented yet!" });
}

async function updateAlbum(req, res) {
  const id = req.params.id;
  const updatedAlbum = req.body;
  const values = [
    updatedAlbum.albumName,
    updatedAlbum.albumImage,
    updatedAlbum.albumReleaseDate,
    id,
  ];
  const updateQuery = /*sql*/ `
        UPDATE albums 
        SET albumName=?, albumImage=?, albumReleaseDate=? 
        WHERE albums.albumID=?;
    `;
  const getQuery = /*sql*/ `
    SELECT * FROM albums WHERE albumID=?;
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

async function deleteAlbum(req, res) {
  const id = req.params.id;
  const values = [id];
  const deleteQuery = /*sql*/ `DELETE FROM albums WHERE albumID=?;`;
  const getQuery = /*sql*/ `
    SELECT * FROM albums;
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
  getAllAlbums,
  getAlbumsById,
  getAlbumWithSongs,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};
