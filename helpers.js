function formatArtistAlbums(artistAlbums) {
  // Create an object to store artists with albums as an array
  const artistsWithAlbums = {};

  for (const artist of artistAlbums) {
    // If the artists is not in the object, add it
    if (!artistsWithAlbums[artist.artistID]) {
      artistsWithAlbums[artist.artistID] = {
        artistID: artist.artistID,
        artistName: artist.artistName,
        artistImage: artist.artistImage,
        artistDescription: artist.artistDescription,
        albums: [],
      };
    }

    // Add album information to the artist array
    if (artist.albumID !== null) {
      artistsWithAlbums[artist.artistID].albums.push({
        albumID: artist.albumID,
        albumName: artist.albumName,
        albumImage: artist.albumImage,
        albumReleaseDate: artist.albumReleaseDate,
      });
    }
  }

  // Convert the object of artists into an array
  const artistsArray = Object.values(artistsWithAlbums);
  return artistsArray;
}

function formatArtistAlbumSongs(artistAlbumSongs) {
  const artistsWithAlbums = {};

  for (const artist of artistAlbumSongs) {
    // If the artists is not in the object, add it
    if (!artistsWithAlbums[artist.artistID]) {
      artistsWithAlbums[artist.artistID] = {
        artistID: artist.artistID,
        artistName: artist.artistName,
        artistImage: artist.artistImage,
        artistDescription: artist.artistDescription,
        albums: [],
      };
    }

    if (artist.albumID !== null) {
      const album = artistsWithAlbums[artist.artistID].albums.find(
        a => a.albumID === artist.albumID
      );
      if (!album) {
        artistsWithAlbums[artist.artistID].albums.push({
          albumID: artist.albumID,
          albumName: artist.albumName,
          albumImage: artist.albumImage,
          albumReleaseDate: artist.albumReleaseDate,
          songs: [],
        });
        if (artist.songID !== null) {
          artistsWithAlbums[artist.artistID].albums[0].songs.push({
            songID: artist.songID,
            songName: artist.songName,
          });
        }
      } else {
        if (artist.songID !== null) {
          artistsWithAlbums[artist.artistID].albums[0].songs.push({
            songID: artist.songID,
            songName: artist.songName,
          });
        }
      }
    }
  }

  const artistsArray = Object.values(artistsWithAlbums);
  return artistsArray;
}

function formatAlbums(albumsArtists) {
  // Create an object to store artists with albums as an array
  const albumsWithArtists = {};

  for (const album of albumsArtists) {
    // If the album is not in the object, add it
    if (!albumsWithArtists[album.albumID]) {
      albumsWithArtists[album.albumID] = {
        albumID: album.albumID,
        albumName: album.albumName,
        albumImage: album.albumImage,
        albumReleaseDate: album.albumReleaseDate,
        artistNames: [],
      };
    }
    // Add artist information to the album array
    if (album.artistID !== null) {
      const artist = albumsWithArtists[album.albumID].artistNames.find(
        a => a.artistID === album.artistID
      );
      if (!artist) {
        albumsWithArtists[album.albumID].artistNames.push(album.artistNames);
      }
    }
  }

  // Convert the object of artists into an array
  const albumsArray = Object.values(albumsWithArtists);
  return albumsArray;
}

function formatAlbumSongs(albumSongs) {
  // Create an object to store artists with albums as an array
  const albumsWithArtists = {};

  for (const album of albumSongs) {
    // If the album is not in the object, add it
    if (!albumsWithArtists[album.albumID]) {
      albumsWithArtists[album.albumID] = {
        albumID: album.albumID,
        albumName: album.albumName,
        albumImage: album.albumImage,
        albumReleaseDate: album.albumReleaseDate,
        artistNames: [],
        songs: [],
      };
    }

    // Add artist information to the album array
    if (album.artistID !== null) {
      const artist = albumsWithArtists[album.albumID].artistNames.find(
        a => a === album.artistNames
      );

      if (!artist) {
        albumsWithArtists[album.albumID].artistNames.push(album.artistNames);
      }
    }

    if (album.songID !== null) {
      const song = albumsWithArtists[album.albumID].songs.find(
        a => a.songID === album.songID
      );
      if (!song) {
        albumsWithArtists[album.albumID].songs.push({
          songID: album.songID,
          songName: album.songName,
        });
      }
    }
  }

  // Convert the object of artists into an array
  const albumsArray = Object.values(albumsWithArtists);
  return albumsArray;
}

export {
  formatArtistAlbums,
  formatArtistAlbumSongs,
  formatAlbums,
  formatAlbumSongs,
};
