import albumsUtils from "./albumsUtils.js";
import albumsModel from "./albumsModel.js";
import artistsModel from "../artists/artistsModel.js";
import songsModel from "../songs/songsModel.js";
import sharedModel from "../shared/sharedModel.js";

async function getAlbums(req, res) {
  const { artistName, albumName, songName } = req.query;
  try {
    const data = await albumsModel.getAlbums(artistName, albumName, songName);
    // res.json(data);
    res.json(albumsUtils.formatAlbums(data));
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

async function addAlbum(req, res) {
  const newAlbum = req.body;
  const values = [
    newAlbum.albumName,
    newAlbum.albumImage,
    newAlbum.albumReleaseDate,
  ];
  const artistsIds = newAlbum.artists;
  const songIds = newAlbum.songs;
  try {
    // Create album
    const data = await albumsModel.addAlbum(values);
    const albumId = data.insertId;

    // ADD TO JUNCTION TABLE artists_albums (LOOP)
    for (const artistId of artistsIds) {
      // ADD TO JUNCTION TABLE QUERY
      const junctionValues = [artistId, albumId];
      await sharedModel.addJoinArtistAlbum(junctionValues);
    }

    // ADD TO JUNCTION TABLE albums_songs (LOOP)
    for (const songId of songIds) {
      // ADD TO JUNCTION TABLE QUERY
      const junctionValues = [albumId, songId];
      await sharedModel.addJoinAlbumSong(junctionValues);
    }

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
    // album values
    const albumValues = [
      body.albumName,
      body.albumImage,
      body.albumReleaseDate,
    ];
    const albumData = await albumsModel.addAlbum(albumValues);
    const albumId = albumData.insertId;
    // ADD Artists (LOOP)
    const artistsIds = [];
    for (const artist of body.artists) {
      // Only create artist, if it doen't exist
      if (artist.artistID === undefined) {
        const artistValues = [
          artist.artistName,
          artist.artistImage,
          artist.artistDescription,
        ];
        const artistData = await artistsModel.addArtist(artistValues);
        artistsIds.push(artistData.insertId);
      } else {
        artistsIds.push(artist.artistID);
      }
    }
    // ADD TO JUNCTION TABLE artists_albums (LOOP)
    for (const artistId of artistsIds) {
      // ADD TO JUNCTION TABLE QUERY
      const junctionValues = [artistId, albumId];
      await sharedModel.addJoinArtistAlbum(junctionValues);
    }
    // ADD SONGS (LOOP)
    const songsIds = [];
    for (const song of body.songs) {
      if (song.songID === undefined) {
        const songValues = [song.songName, song.songDuration];
        const songData = await songsModel.addSong(songValues);
        songsIds.push(songData.insertId);
        // Add to req body for later reference
        song.songID = songData.insertId;
      } else {
        songsIds.push(song.songID);
      }
    }

    // CREATE featured artists
    const featuredArtistIds = [];
    for (const song of body.songs) {
      const featuredArtists = song.featuredArtists;
      if (featuredArtists.length > 0) {
        for (const artist of featuredArtists) {
          if (artist.artistID === undefined) {
            const artistValues = [
              artist.artistName,
              artist.artistImage,
              artist.artistDescription,
            ];
            const artistData = await artistsModel.addArtist(artistValues);
            featuredArtistIds.push(artistData.insertId);
            artist.artistID = artistData.insertId;
          } else {
            featuredArtistIds.push(artist.artistID);
          }
        }
      }
    }

    // ADD TO JUNCTION TABLE albums_songs (LOOP)
    for (const songId of songsIds) {
      // ADD TO JUNCTION TABLE QUERY
      const junctionValues = [albumId, songId];
      await sharedModel.addJoinAlbumSong(junctionValues);
    }
    // ADD TO JUNCTION TABLE artists_songs (LOOP)
    for (const songId of songsIds) {
      for (const artistId of artistsIds) {
        const junctionValues = [artistId, songId, true];
        await sharedModel.addJoinArtistSong(junctionValues);
      }
    }

    // ADD FEATURED ARTISTS TO JUNCTION TABLE artists_songs (LOOP)
    for (const song of body.songs) {
      const songId = song.songID;
      for (const featArtist of song.featuredArtists) {
        const featArtistId = featArtist.artistID;
        const junctionValues = [featArtistId, songId, false];
        await sharedModel.addJoinArtistSong(junctionValues);
      }
    }
    res.status(201).json({ url: `/albums/${albumId}/artists/songs` });
  } catch (error) {
    res.status(500).json({
      message: "500 - Internal server error",
      errorCode: error,
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
    // Delete from junction tables

    await sharedModel.deleteJoinArtistAlbum(values);
    await sharedModel.deleteJoinAlbumSong(values);
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
  getAlbumsById,
  addAlbum,
  addAlbumArtistsSongs,
  updateAlbum,
  deleteAlbum,
};
