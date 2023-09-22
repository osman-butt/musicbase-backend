import connection from "../../database.js";

async function getAlbums() {
  const query = /*sql*/ `SELECT * FROM albums;`;
  const [rows, fields] = await connection.execute(query);
  return rows;
}

async function getAlbumsArtists() {
  const query = /*sql*/ `
    SELECT albums.*, artists.* FROM albums
      LEFT JOIN artists_albums ON albums.albumID = artists_albums.albumID
      LEFT JOIN artists ON artists_albums.artistID = artists.artistID
  `;
  const [rows, fields] = await connection.execute(query);
  return rows;
}

async function getAlbumsById(values) {
  const query = /*sql*/ `SELECT * FROM albums WHERE albumID=?;`;
  const [rows, fields] = await connection.execute(query, values);
  return rows;
}

async function getAlbumsByIdArtists(values) {
  const query = /*sql*/ `
        SELECT artists.*, albums.* FROM albums
        LEFT JOIN artists_albums ON albums.albumID = artists_albums.albumID
        LEFT JOIN artists ON artists_albums.artistID = artists.artistID
        WHERE albums.albumID=?;
    `;

  const [rows, fields] = await connection.execute(query, values);
  return rows;
}

async function getAlbumsByIdSongs(values) {
  const query = /*sql*/ `
        SELECT albums.*, songs.* FROM albums
            LEFT JOIN albums_songs on albums.albumID = albums_songs.albumID
            LEFT JOIN songs on albums_songs.songID = songs.songID
            WHERE albums.albumID=?;
    `;
  const [rows, fields] = await connection.execute(query, values);
  return rows;
}

async function getAlbumsByIdArtistsSongs(values) {
  // const query = /*sql*/ `
  //   SELECT albums.*, artists.*, songs.*,artists_songs.isPrimary FROM albums
  //     LEFT JOIN artists_albums ON albums.albumID = artists_albums.albumID
  //     LEFT JOIN artists ON artists_albums.artistID = artists.artistID
  //     LEFT JOIN albums_songs on albums.albumID = albums_songs.albumID
  //     LEFT JOIN songs on albums_songs.songID = songs.songID
  //     LEFT JOIN artists_songs ON songs.songID = artists_songs.songID
  //     WHERE albums.albumID=?;
  // `;

  const query = /*sql*/ `
    (SELECT albums.*, songs.*, artists.*, songs.*, artists_songs.isPrimary FROM albums
      LEFT JOIN artists_albums ON albums.albumID = artists_albums.albumID
      LEFT JOIN artists ON artists_albums.artistID = artists.artistID
      LEFT JOIN albums_songs on albums.albumID = albums_songs.albumID
      LEFT JOIN songs on albums_songs.songID = songs.songID
      JOIN artists_songs ON songs.songID = artists_songs.songID AND artists.artistID = artists_songs.artistID
            WHERE albums.albumID=? AND artists_songs.isPrimary=1)
    UNION
    (SELECT albums.*, songs.*, artists.*, songs.*, artists_songs.isPrimary FROM songs
      LEFT JOIN artists_songs ON songs.songID = artists_songs.songID
      LEFT JOIN artists ON artists_songs.artistID = artists.artistID
      LEFT JOIN albums_songs ON songs.songID = albums_songs.songID
      LEFT JOIN albums ON albums_songs.albumID = albums.albumID
      WHERE albums.albumID=? AND artists_songs.isPrimary=0
);
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
  getAlbums,
  getAlbumsArtists,
  getAlbumsById,
  getAlbumsByIdArtists,
  getAlbumsByIdSongs,
  getAlbumsByIdArtistsSongs,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};
