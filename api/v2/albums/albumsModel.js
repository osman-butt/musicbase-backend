import connection from "../../../database.js";

async function getAlbums(artistName, albumName, songName) {
  let query = /*sql*/ `SELECT *
FROM (SELECT DISTINCT albums.*, artists.artistID, NULL as songID FROM albums
      LEFT JOIN artists_albums ON albums.albumID = artists_albums.albumID
      LEFT JOIN artists ON artists_albums.artistID = artists.artistID
UNION
SELECT DISTINCT albums.*,null as artistID, songs.songID  FROM songs
    LEFT JOIN albums_songs ON songs.songID = albums_songs.songID
    LEFT JOIN albums ON albums_songs.albumID = albums.albumID) AS albums WHERE 1`;

  const values = [];

  if (artistName) {
    query += /*sql*/ ` AND albums.albumID IN (
      SELECT artists_albums.albumID FROM artists
        LEFT JOIN artists_albums ON artists.artistID = artists_albums.artistID
        WHERE artists.artistName LIKE ?)`;
    values.push(`%${artistName}%`);
  }

  if (songName) {
    query += /*sql*/ ` AND albums.albumID IN (
      SELECT albums_songs.albumID FROM songs
        LEFT JOIN albums_songs ON songs.songID = albums_songs.songID
        WHERE songs.songName LIKE ?)`;
    values.push(`%${songName}%`);
  }

  if (albumName) {
    query += /*sql*/ ` AND albums.albumName LIKE ?`;
    values.push(`%${albumName}%`);
  }

  query += ";";
  const [rows, fields] = await connection.execute(query, values);
  return rows;
}

async function getAlbumsById(values) {
  const query = /*sql*/ `SELECT * FROM albums WHERE albumID=?;`;
  const [rows, fields] = await connection.execute(query, values);
  return rows;
}

async function addAlbum(values) {
  const query = /*sql*/ `
      INSERT INTO albums (albumName,albumImage,albumReleaseDate)
      VALUES (?,?,?)
    `;
  const [rows] = await connection.execute(query, values);
  return rows;
}

async function updateAlbum(values) {
  const query = /*sql*/ `
        UPDATE albums 
        SET albumName=?, albumImage=?, albumReleaseDate=? 
        WHERE albums.albumID=?;
    `;
  const [rows, fields] = await connection.execute(query, values);
  return rows;
}

async function deleteAlbum(values) {
  const query = /*sql*/ `DELETE FROM albums WHERE albumID=?;`;
  const [rows] = await connection.execute(query, values);
  return rows;
}

export default {
  getAlbums,
  getAlbumsById,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};
