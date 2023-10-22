import connection from "../../../database.js";

async function addJoinArtistAlbum(values) {
  const query = /*sql*/ `
      INSERT INTO artists_albums (artistID, albumID)
      VALUES (?,?)
    `;
  const [rows] = await connection.execute(query, values);
  return rows;
}

async function addJoinArtistSong(values) {
  const query = /*sql*/ `
      INSERT INTO artists_songs (artistID, songID, isPrimary)
      VALUES (?,?,?)
    `;
  const [rows] = await connection.execute(query, values);
  return rows;
}

async function addJoinAlbumSong(values) {
  const query = /*sql*/ `
      INSERT INTO albums_songs (albumID, songID)
      VALUES (?,?)
    `;
  const [rows] = await connection.execute(query, values);
  return rows;
}

export default {
  addJoinArtistAlbum,
  addJoinArtistSong,
  addJoinAlbumSong,
};
