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

// function formatArtistAlbumSongs(artistAlbumSongsArray) {
//   const transformedArray = artistAlbumSongsArray.reduce((acc, current) => {
//     const existingArtist = acc.find(item => item.artistID === current.artistID);

//     if (existingArtist) {
//       const existingAlbum = existingArtist.album.find(
//         album => album.albumID === current.albumID
//       );

//       if (existingAlbum) {
//         existingAlbum.songs.push({
//           songID: current.songID,
//           songName: current.songName,
//         });
//       } else {
//         existingArtist.album.push({
//           albumID: current.albumID,
//           albumName: current.albumName,
//           albumImage: current.albumImage,
//           albumReleaseDate: current.albumReleaseDate,
//           songs: [
//             {
//               songID: current.songID,
//               songName: current.songName,
//             },
//           ],
//         });
//       }
//     } else {
//       acc.push({
//         artistID: current.artistID,
//         artistName: current.artistName,
//         artistImage: current.artistImage,
//         artistDescription: current.artistDescription,
//         album: [
//           {
//             albumID: current.albumID,
//             albumName: current.albumName,
//             albumImage: current.albumImage,
//             albumReleaseDate: current.albumReleaseDate,
//             songs: [
//               {
//                 songID: current.songID,
//                 songName: current.songName,
//               },
//             ],
//           },
//         ],
//       });
//     }

//     return acc;
//   }, []);

//   return transformedArray;
// }

export { formatArtistAlbums, formatArtistAlbumSongs };
