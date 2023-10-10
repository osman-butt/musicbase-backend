import connection from "../../../database.js";

async function getSongs() {
  const query = /*sql*/ `SELECT * FROM songs;`;
  const [rows, fields] = await connection.execute(query);
  return rows;
}

async function getSongsAlbumsArtists(artistName, albumName, songName) {
  let query = /*sql*/ `SELECT * FROM songs LEFT JOIN artists_songs ON songs.songID = artists_songs.songID LEFT JOIN artists ON artists_songs.artistID = artists.artistID LEFT JOIN albums_songs ON songs.songID = albums_songs.songID LEFT JOIN albums ON albums_songs.albumID = albums.albumID WHERE 1`;

  const values = [];

  if (albumName) {
    query += ` AND albums.albumName LIKE ?`;
    values.push(`%${albumName}%`);
  }

  if (songName) {
    query += ` AND songs.songName LIKE ?`;
    values.push(`%${songName}%`);
  }

  if (artistName) {
    query += /*sql*/ ` AND songs.songID IN (
      SELECT artists_songs.songID FROM artists
      LEFT JOIN artists_songs ON artists.artistID = artists_songs.artistID WHERE artists.artistName LIKE ?)`;
    values.push(`%${artistName}%`);
  }

  query += ";";
  const [rows, fields] = await connection.execute(query, values);
  return rows;
}

async function getSongsById(values) {
  const query = /*sql*/ `SELECT * FROM songs WHERE songID=?;`;
  const [rows, fields] = await connection.execute(query, values);
  return rows;
}

async function addSong(values) {
  const query = /*sql*/ `INSERT INTO songs (songName,songDuration) VALUES (?,?);`;
  const [rows, fields] = await connection.execute(query, values);
  return rows;
}

async function updateSong(values) {
  const query = /*sql*/ `
    UPDATE songs SET songName=?,songDuration=? WHERE songID=?;`;
  const [rows, fields] = await connection.execute(query, values);
  return rows;
}

async function deleteSong(values) {
  const query = /*sql*/ `
        DELETE FROM songs
        WHERE songID=?;
    `;
  const [rows, fields] = await connection.execute(query, values);
  return rows;
}

export default {
  getSongs,
  getSongsAlbumsArtists,
  getSongsById,
  addSong,
  updateSong,
  deleteSong,
};
