function formatArtistAlbums(artistsAlbums) {
  // Create an object to store artists with albums as an array
  const artistsWithAlbums = {};

  for (const artist of artistsAlbums) {
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

export { formatArtistAlbums };
