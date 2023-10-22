function formatSongsAlbumsArtists(obj) {
  const uniqueSongs = [];
  for (const song of obj) {
    if (!uniqueSongs[song.songID]) {
      uniqueSongs[song.songID] = {
        songID: song.songID,
        songName: song.songName,
        songDuration: song.songDuration,
        artists: [], // Initialize an empty array for primary artists
        featuredArtists: [], // Initialize an empty array for featured artists
      };
    }

    // Add artist info
    if (song.artistID !== null) {
      if (song.isPrimary === 1) {
        uniqueSongs[song.songID].artists.push(song.artistID);
      } else {
        uniqueSongs[song.songID].featuredArtists.push(song.artistID);
      }
    }
  }
  const songsArr = Object.values(uniqueSongs);
  return songsArr;
}

export default { formatSongsAlbumsArtists };
