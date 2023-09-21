import connection from "../../database.js";

async function getAllArtists() {
  const query = /*sql*/ `SELECT * FROM artists;`;
  const [rows, fields] = await connection.execute(query);
  return rows;
}

async function getArtistById(values) {
  const query = /*sql*/ `SELECT * FROM artists WHERE artistID=?;`;
  const [rows, fields] = await connection.execute(query, values);
  return rows;
}

async function getArtistWithAlbums(values) {
  const query = /*sql*/ `
  SELECT artists.artistID, artists.artistName, artists.artistImage,artists.artistDescription, 
  albums.albumID, albums.albumName, albums.albumImage, albums.albumReleaseDate
      FROM artists
      LEFT JOIN artists_albums ON artists.artistID = artists_albums.artistID
      LEFT JOIN albums ON artists_albums.albumID = albums.albumID WHERE artists.artistID=?;`;

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
  getAllArtists,
  getArtistById,
  getArtistWithAlbums,
  addArtist,
  updateArtist,
  deleteArtist,
};
