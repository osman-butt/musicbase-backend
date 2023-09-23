# API DOCS TIL FRONTEND:

endpoint = https://musicbase-app.azurewebsites.net/api/v1

* [GET /artists](https://github.com/osman-butt/musicbase-backend/blob/main/api-docs.md#get-artists)
* [GET /albums/artists](https://github.com/osman-butt/musicbase-backend/blob/main/api-docs.md#get-albumsartists)
* [GET /songs](https://github.com/osman-butt/musicbase-backend/blob/main/api-docs.md#get-songs-ikke-f%C3%A6rdig-endnu)

## GET /artists
Se alle kunstnere (kun kunster info uden sange og album). Kode til at fetche fra frontend app
```javascript
async function getArtists() {
  const response = await fetch(`${endpoint}/artists`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const artists = await response.json();
  return artists;
}
```
RESPONSE
```json
[
    {
        "artistID": 1001,
        "artistName": "Eminem",
        "artistImage": "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
        "artistDescription": "EMINEM"
    },
    {
        "artistID": 1002,
        "artistName": "50 Cent",
        "artistImage": "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
        "artistDescription": "50 CENT"
    },
    {
        "artistID": 1003,
        "artistName": "Nate Dogg",
        "artistImage": "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
        "artistDescription": "NATE DOGG"
    },
    {
        "artistID": 1004,
        "artistName": "Lisa Davis",
        "artistImage": "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
        "artistDescription": "An emerging talent in the music industry."
    }
]
```

## Get /albums/artists
Se album med kunstnere. Kode til at fetche fra frontend app
```javascript
async function getAlbumsWithArtists() {
  const response = await fetch(`${endpoint}/albums/artists`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const albums = await response.json();
  return albums;
}
```
RESPONSE:

```json
[
    {
        "albumID": 3001,
        "albumName": "Encore",
        "albumImage": "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
        "albumReleaseDate": "2023-09-14T22:00:00.000Z",
        "artists": [
            {
                "artistID": 1001,
                "artistName": "Eminem",
                "artistImage": "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
                "artistDescription": "EMINEM"
            }
        ]
    },
    {
        "albumID": 3002,
        "albumName": "Get Rich or Die Tryin",
        "albumImage": "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
        "albumReleaseDate": "2023-08-24T22:00:00.000Z",
        "artists": [
            {
                "artistID": 1002,
                "artistName": "50 Cent",
                "artistImage": "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
                "artistDescription": "50 CENT"
            }
        ]
    },
    {
        "albumID": 3003,
        "albumName": "Nate Dogg",
        "albumImage": "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
        "albumReleaseDate": "2023-09-04T22:00:00.000Z",
        "artists": [
            {
                "artistID": 1003,
                "artistName": "Nate Dogg",
                "artistImage": "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
                "artistDescription": "NATE DOGG"
            }
        ]
    },
    {
        "albumID": 3004,
        "albumName": "Greatist Hits",
        "albumImage": "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
        "albumReleaseDate": "2023-07-09T22:00:00.000Z",
        "artists": [
            {
                "artistID": 1002,
                "artistName": "50 Cent",
                "artistImage": "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
                "artistDescription": "50 CENT"
            },
            {
                "artistID": 1003,
                "artistName": "Nate Dogg",
                "artistImage": "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
                "artistDescription": "NATE DOGG"
            }
        ]
    }
]
```

## GET /songs (Ikke færdig endnu)
Se sange (uden album og artist). Kode til at fetche fra frontend app
```javascript
async function getSongs() {
  const response = await fetch(`${endpoint}/albums/artists`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const songs = await response.json();
  return songs;
}
```
RESPONSE:
```json
[
    {
        "songID": 6001,
        "songName": "Never Enough\" (feat 50 Cent and Nate Dogg)",
        "songDuration": "00:04:15"
    },
    {
        "songID": 6002,
        "songName": "In Da Club",
        "songDuration": "00:03:50"
    },
    {
        "songID": 6003,
        "songName": "21 Questions (feat Nate Dogg)",
        "songDuration": "00:05:20"
    },
    {
        "songID": 6004,
        "songName": "P.I.M.P.",
        "songDuration": "00:03:30"
    },
    {
        "songID": 6005,
        "songName": "Round and Round",
        "songDuration": "00:04:45"
    }
]
```
