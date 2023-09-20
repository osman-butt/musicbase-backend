import connection from "../../database.js";

async function getAllSongs(req, res) {
  const query = /*sql*/ `SELECT * FROM songs;`;
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

async function getSongsById(req, res) {
  const id = req.params.id;
  const values = [id];
  const query = /*sql*/ `SELECT * FROM songs WHERE songID=?;`;
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

async function addSong(req, res) {
  const newSong = req.body;
  const values = [newSong.songName];
  const addQuery = /*sql*/ `INSERT INTO songs (songName) VALUES (?);`;
  const getQuery = /*sql*/ `
    SELECT * FROM songs WHERE songID=?;
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

async function updateSong(req, res) {
  const id = req.params.id;
  const updatedSong = req.body;
  const values = [updatedSong.songName, id];

  const updateQuery = /*sql*/ `
    UPDATE songs SET songName=? WHERE songID=?;
    `;
  const getQuery = /*sql*/ `
    SELECT * FROM songs WHERE songID=?;
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

async function deleteSong(req, res) {
  const id = req.params.id;
  const values = [id];
  const deleteQuery = /*sql*/ `
        DELETE FROM songs
        WHERE songID=?;
    `;
  const getQuery = /*sql*/ `
    SELECT * FROM songs;
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
  getAllSongs,
  getSongsById,
  addSong,
  updateSong,
  deleteSong,
};

//   res.json({ message: "GET /songs/id is not implemented yet!" });
