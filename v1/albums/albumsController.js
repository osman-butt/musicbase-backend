import albumsUtils from "./albumsUtils.js";
import albumsModel from "./albumsModel.js";

async function getAlbums(req, res) {
  try {
    const data = await albumsModel.getAlbums();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function getAlbumsArtists(req, res) {
  try {
    const data = await albumsModel.getAlbumsArtists();
    res.json(albumsUtils.formatAlbumArtists(data));
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
  try {
    const data = await albumsModel.getAlbumsById(values);
    // res.json(formatAlbums(data));
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function getAlbumsByIdArtists(req, res) {
  const id = req.params.id;
  const values = [id];
  try {
    const data = await albumsModel.getAlbumsByIdArtists(values);
    res.json(albumsUtils.formatAlbumArtists(data));
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function getAlbumsByIdSongs(req, res) {
  const id = req.params.id;
  const values = [id];

  try {
    const data = await albumsModel.getAlbumsByIdSongs(values);
    res.json(albumsUtils.formatAlbumSongs(data));
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function getAlbumsByIdArtistsSongs(req, res) {
  const id = req.params.id;
  const values = [id, id];

  try {
    const data = await albumsModel.getAlbumsByIdArtistsSongs(values);
    res.json(albumsUtils.formatAlbumArtistsSongs(data));
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

  try {
    const data = await albumsModel.addAlbum(values);
    res.status(201).json({ albumID: data.insertId });
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

async function addAlbumArtistsSongs(req, res) {
  const body = req.body;
  try {
    // // ADD ALBUM
    // const albumValues = [
    //   body.albumName,
    //   body.albumImage,
    //   body.albumReleaseDate,
    // ];
    // const addAlbum = await addAlbum(albumValues);
    // // ADD Artists (LOOP)
    // const artistsIds = [];
    // for (const artist of body.artists) {
    //   const artistValues = [
    //     artist.albumName,
    //     artist.albumImage,
    //     artist.albumReleaseDate,
    //   ];
    //   const artistData = await artistsModel.addArtists(artistValues);
    //   artistsIds.push(artistData.insertId);
    // }
    // // ADD TO JUNCTION TABLE artists_albums (LOOP)
    // for (const artistId of artistsIds) {
    //   // ADD TO JUNCTION TABLE QUERY
    // }
    // // ADD SONGS (LOOP)
    // const songsIds = [];
    // for (const song of body.songs) {
    //   const songValues = [
    //     song.albumName,
    //     song.albumImage,
    //     song.albumReleaseDate,
    //   ];
    //   const songData = await songsModel.addSongs(songValues);
    //   songsIds.push(songData.insertId);
    // }

    // // ADD TO JUNCTION TABLE artists_songs (LOOP)
    // for (const songId of songsIds) {
    //   // ADD TO JUNCTION TABLE QUERY
    //   // REMEMBER TO SET isPrimary
    // }
    // // ADD TO JUNCTION TABLE albums_songs (LOOP)
    // for (const songId of songsIds) {
    //   // ADD TO JUNCTION TABLE QUERY
    // }
    res.status(201).json();
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
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

  try {
    await albumsModel.updateAlbum(values);
    res.status(204).json();
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

  try {
    await albumsModel.deleteAlbum(values);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error.errno,
    });
  }
}

export default {
  getAlbums,
  getAlbumsArtists,
  getAlbumsById,
  getAlbumsByIdArtists,
  getAlbumsByIdSongs,
  getAlbumsByIdArtistsSongs,
  addAlbum,
  addAlbumArtistsSongs,
  updateAlbum,
  deleteAlbum,
};
