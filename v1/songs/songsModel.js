import connection from "../../database.js";

async function getSongs() {
  const query = /*sql*/ `SELECT * FROM songs;`;
  const [rows, fields] = await connection.execute(query);
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

export default { getSongs, getSongsById, addSong, updateSong, deleteSong };
