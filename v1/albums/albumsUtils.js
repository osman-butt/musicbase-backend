function formatAlbumArtists(albumArtists) {
  const albumWithArtists = [];

  for (const album of albumArtists) {
    // If the album is not in the object, add it
    if (!albumWithArtists[album.albumID]) {
      albumWithArtists[album.albumID] = {
        albumID: album.albumID,
        albumName: album.albumName,
        albumImage: album.albumImage,
        albumReleaseDate: album.albumReleaseDate,
        artists: [],
      };
    }
    // Add artist information to the album array
    if (album.artistID !== null) {
      const artist = albumWithArtists[album.albumID].artists.find(
        a => a.artistID === album.artistID
      );
      if (!artist) {
        albumWithArtists[album.albumID].artists.push({
          artistID: album.artistID,
          artistName: album.artistName,
          artistImage: album.artistImage,
          artistDescription: album.artistDescription,
        });
      }
    }
  }

  // Convert the object of artists into an array
  const albumArtistsArr = Object.values(albumWithArtists);
  return albumArtistsArr;
}

function formatAlbumSongs(albumSongs) {
  const albumWithSongs = [];

  for (const album of albumSongs) {
    // If the album is not in the object, add it
    if (!albumWithSongs[album.albumID]) {
      albumWithSongs[album.albumID] = {
        albumID: album.albumID,
        albumName: album.albumName,
        albumImage: album.albumImage,
        albumReleaseDate: album.albumReleaseDate,
        songs: [],
      };
    }
    // // Add artist information to the album array
    // if (album.artistID !== null) {
    //   const artist = albumWithSongs[album.albumID].artists.find(
    //     a => a.artistID === album.artistID
    //   );
    //   if (!artist) {
    //     albumWithSongs[album.albumID].artists.push({
    //       artistID: album.artistID,
    //       artistName: album.artistName,
    //       artistImage: album.artistImage,
    //       artistDescription: album.artistDescription,
    //     });
    //   }
    // }

    // Add artist information to the album array
    if (album.songID !== null) {
      const song = albumWithSongs[album.albumID].songs.find(
        a => a.songID === album.songID
      );
      if (!song) {
        albumWithSongs[album.albumID].songs.push({
          songID: album.songID,
          songName: album.songName,
          songDuration: album.songDuration,
        });
      }
    }
  }

  // Convert the object of artists into an array
  const albumSongsArr = Object.values(albumWithSongs);
  return albumSongsArr;
}

function formatAlbumArtistsSongs(albumArtistsSongs) {
  const albumWithArtistsSongs = [];
  for (const album of albumArtistsSongs) {
    // If the album is not in the object, add it
    if (!albumWithArtistsSongs[album.albumID]) {
      albumWithArtistsSongs[album.albumID] = {
        albumID: album.albumID,
        albumName: album.albumName,
        albumImage: album.albumImage,
        albumReleaseDate: album.albumReleaseDate,
        artists: [],
        songs: [],
      };
    }

    // Add song information to the album array
    if (album.songID !== null) {
      const song = albumWithArtistsSongs[album.albumID].songs.find(
        a => a.songID === album.songID
      );
      if (!song) {
        albumWithArtistsSongs[album.albumID].songs.push({
          songID: album.songID,
          songName: album.songName,
          songDuration: album.songDuration,
          featuredArtists: [],
        });
      }
    }

    // Add artist information to the album array
    if (album.artistID !== null) {
      const artist = albumWithArtistsSongs[album.albumID].artists.find(
        a => a.artistID === album.artistID
      );
      if (!artist && album.isPrimary === 1) {
        albumWithArtistsSongs[album.albumID].artists.push({
          artistID: album.artistID,
          artistName: album.artistName,
          artistImage: album.artistImage,
          artistDescription: album.artistDescription,
        });
      }
    }
  }

  // ADDING Featured Artists:
  const featuredArtists = albumArtistsSongs.filter(
    album => album.isPrimary === 0
  );

  for (const song of albumWithArtistsSongs[albumWithArtistsSongs.length - 1]
    .songs) {
    const featArtistsSong = featuredArtists.filter(
      a => a.songID === song.songID
    );
    if (featArtistsSong.length > 0) {
      for (const artist of featArtistsSong) {
        song.featuredArtists.push({
          artistID: artist.artistID,
          artistName: artist.artistName,
          artistImage: artist.artistImage,
          artistDescription: artist.artistDescription,
        });
      }
    }
  }

  // Convert the object of albums into an array
  const albumSongsArr = Object.values(albumWithArtistsSongs);
  return albumSongsArr;
}

export default {
  formatAlbumArtists,
  formatAlbumSongs,
  formatAlbumArtistsSongs,
};
