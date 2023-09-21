import connection from "../../database.js";

async function getAllAlbums() {
  //   const query = /*sql*/ `
  //     SELECT albums.*, artists.artistName as artistNames, artists.artistID FROM albums
  //         LEFT JOIN artists_albums on albums.albumID = artists_albums.albumID
  //         LEFT JOIN artists on artists_albums.artistID = artists.artistID;
  //   `;
  const query = /*sql*/ `SELECT * FROM albums;`;
  const [rows, fields] = await connection.execute(query);
  return rows;
}

async function getAlbumsById(values) {
  //   const query = /*sql*/ `
  //     SELECT albums.*, artists.artistName as artistNames, artists.artistID FROM albums
  //         LEFT JOIN artists_albums on albums.albumID = artists_albums.albumID
  //         LEFT JOIN artists on artists_albums.artistID = artists.artistID
  //         WHERE albums.albumID=?;
  //   `;
  const query = /*sql*/ `SELECT * FROM albums WHERE albumID=?`;
  const [rows, fields] = await connection.execute(query, values);
  return rows;
}

async function getAlbumSongs(values) {
  const query = /*sql*/ `
        SELECT albums.*, artists.artistName as artistNames, artists.artistID, songs.* FROM albums
            LEFT JOIN artists_albums on albums.albumID = artists_albums.albumID
            LEFT JOIN artists on artists_albums.artistID = artists.artistID
            LEFT JOIN albums_songs on albums.albumID = albums_songs.albumID
            LEFT JOIN songs on albums_songs.songID = songs.songID
            WHERE albums.albumID=?;
    `;
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
  getAllAlbums,
  getAlbumsById,
  getAlbumSongs,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};
