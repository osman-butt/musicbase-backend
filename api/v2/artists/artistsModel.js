import connection from "../../../database.js";

async function getArtists(artistName, albumName, songName) {
  let query = /*sql*/ `SELECT DISTINCT artists.* FROM artists`;

  const values = [];

  if (artistName) {
    query += /*sql*/ ` WHERE artists.artistName LIKE ?`;
    values.push(`%${artistName}%`);
  }

  if (songName) {
    query += /*sql*/ ` 
      LEFT JOIN artists_songs ON artists.artistID = artists_songs.artistID
      LEFT JOIN songs ON artists_songs.songID = songs.songID
      WHERE songs.songName LIKE ?`;
    values.push(`%${songName}%`);
  }

  if (albumName) {
    query += /*sql*/ ` 
    LEFT JOIN artists_albums ON artists.artistID = artists_albums.artistID
      LEFT JOIN albums ON artists_albums.albumID = albums.albumID
      WHERE albums.albumName LIKE ?
    `;
    values.push(`%${albumName}%`);
  }

  query += ";";
  const [rows, fields] = await connection.execute(query, values);
  return rows;
}

async function getArtistById(values) {
  const query = /*sql*/ `SELECT * FROM artists WHERE artistID=?;`;
  const [rows, fields] = await connection.execute(query, values);
  return rows;
}

async function addArtist(values) {
  const query = /*sql*/ `
    INSERT INTO artists (artistName,artistImage,artistDescription)
    VALUES (?,?,?)`;
  const [rows] = await connection.execute(query, values);
  return rows;
}

async function updateArtist(values) {
  const query = /*sql*/ `
    UPDATE artists SET artistName=?, artistImage=?, 
        artistDescription=? WHERE artists.artistID=?;`;
  const [rows] = await connection.execute(query, values);
  return rows;
}

async function deleteArtist(values) {
  const query = /*sql*/ `DELETE FROM artists WHERE artistID=?;`;
  const [rows, fields] = await connection.execute(query, values);
  return rows;
}

export default {
  getArtists,
  getArtistById,
  addArtist,
  updateArtist,
  deleteArtist,
};
