function formatSongsAlbumsArtists(obj) {
  const uniqueData = [];

  for (const item of obj) {
    const existingItem = uniqueData.find(
      data => data.songID === item.songID && data.albumID === item.albumID
    );

    if (!existingItem) {
      const newObject = {
        songID: item.songID,
        albumID: item.albumID,
        songName: item.songName,
        songDuration: item.songDuration,
        albumName: item.albumName,
        albumImage: item.albumImage,
        albumReleaseDate: item.albumReleaseDate,
        artists: [], // Initialize an empty array for primary artists
        featuredArtists: [], // Initialize an empty array for featured artists
      };

      if (item.isPrimary === 1) {
        newObject.artists.push({
          artistID: item.artistID,
          isPrimary: item.isPrimary,
          artistName: item.artistName,
          artistImage: item.artistImage,
          artistDescription: item.artistDescription,
        });
      } else {
        newObject.featuredArtists.push({
          artistID: item.artistID,
          isPrimary: item.isPrimary,
          artistName: item.artistName,
          artistImage: item.artistImage,
          artistDescription: item.artistDescription,
        });
      }

      uniqueData.push(newObject);
    } else {
      if (item.isPrimary === 1) {
        existingItem.artists.push({
          artistID: item.artistID,
          isPrimary: item.isPrimary,
          artistName: item.artistName,
          artistImage: item.artistImage,
          artistDescription: item.artistDescription,
        });
      } else {
        existingItem.featuredArtists.push({
          artistID: item.artistID,
          isPrimary: item.isPrimary,
          artistName: item.artistName,
          artistImage: item.artistImage,
          artistDescription: item.artistDescription,
        });
      }
    }
  }
  return uniqueData;
}

export default { formatSongsAlbumsArtists };
