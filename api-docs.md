# API DOCUMENTATION:

## Endpoint
```
https://musicbase-app.azurewebsites.net/api/v1
```

## Overview
The guide exclusively showcases the currently utilized endpoints. Please be aware that there exists additional endpoints not covered within this guide.

### Endpoints used in frontend
* ```GET /artists``` Returns artists data only
  * ```GET /artists?[searchValue]=[keyWord]``` Returns all artists that match the keyword based on searchvalue
* ```GET /albums/artists``` Returns albums with artists info
  * ```GET /albums/artists?[searchValue]=[keyWord]``` Returns all albums with artists info that match the keyword based on searchvalue
* ```GET /songs/albums/artists``` Returns all songs with album and artists info
  * ```GET /songs/albums/artists?[searchValue]=[keyWord]``` Returns all songs with album and artists info that match the keyword based on searchvalue
### Endpoints to create and see all resources at once
* ```GET /albums/:albumID/artists/songs``` Returns all artists and songs info for a specific album
* ```POST /albums/artists/songs``` Creates all resources at once

## GET /artists
Get all artists data (without albums and songs):

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
    }
]
```
### GET /artists?[SEARCHVALUE]=[KEYWORD]
Enables the user to search for all artists that matches a pattern. There are three possible ```SEARCHVALUES```:
* ```artistName```: returns all artists that match ```KEYWORD``` (wildcard search).
* ```albumName```: returns all artists, where the albumname match ```KEYWORD``` (wildcard search).
* ```songName```: returns all artists, where the songname match ```KEYWORD``` (wildcard search).

#### Example
```url
GET /artists?albumName=Encore
```
RESPONSE:
```json
[
    {
        "artistID": 1001,
        "artistName": "Eminem",
        "artistImage": "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
        "artistDescription": "EMINEM"
    }
]
```

## Get /albums/artists
Returns all albums and the artists of the album
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
### GET /albums/artists?[SEARCHVALUE]=[KEYWORD]
Enables the user to search for all albums that matches a pattern. There are three possible ```SEARCHVALUES```:
* ```artistName```: returns all albums, where the artistName match ```KEYWORD``` (wildcard search).
* ```albumName```: returns all albums, where the albumname match ```KEYWORD``` (wildcard search).
* ```songName```: returns all albums, where the songname match ```KEYWORD``` (wildcard search).

#### Example
```url
GET /albums/artists?artistName=nem
```
RESPONSE:
```json
[
    {
        "albumID": 3001,
        "albumName": "Encore",
        "albumImage": "https://i.scdn.co/image/ab67616d0000b273dfd0ebe9b4b99f621f376453",
        "albumReleaseDate": "2023-09-14T22:00:00.000Z",
        "artists": [
            {
                "artistID": 1001,
                "artistName": "Eminem",
                "artistImage": "https://i.scdn.co/image/ab6761610000e5eba00b11c129b27a88fc72f36b",
                "artistDescription": "EMINEM"
            }
        ]
    },
    {
        "albumID": 3024,
        "albumName": "TEST ALBUM1",
        "albumImage": "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
        "albumReleaseDate": "1989-12-31T23:00:00.000Z",
        "artists": [
            {
                "artistID": 1001,
                "artistName": "Eminem",
                "artistImage": "https://i.scdn.co/image/ab6761610000e5eba00b11c129b27a88fc72f36b",
                "artistDescription": "EMINEM"
            },
            {
                "artistID": 1002,
                "artistName": "50 Cent",
                "artistImage": "https://i.scdn.co/image/6f0da41419b31d9d2ba55d2df212f59ad0668118",
                "artistDescription": "50 CENT"
            }
        ]
    }
]
```


## GET /songs/albums/artists
Returns all songs with album and artists info. Each object is unique based on the pair (```songID```,```albumID```)

RESPONSE:
```json
[
    {
        "songID": 6001,
        "albumID": 3001,
        "songName": "Never Enough\" (feat 50 Cent and Nate Dogg)",
        "songDuration": "00:04:15",
        "albumName": "Encore",
        "albumImage": "https://i.scdn.co/image/ab67616d0000b273dfd0ebe9b4b99f621f376453",
        "albumReleaseDate": "2023-09-14T22:00:00.000Z",
        "artists": [
            {
                "artistID": 1001,
                "isPrimary": 1,
                "artistName": "Eminem",
                "artistImage": "https://i.scdn.co/image/ab6761610000e5eba00b11c129b27a88fc72f36b",
                "artistDescription": "EMINEM"
            }
        ],
        "featuredArtists": [
            {
                "artistID": 1002,
                "isPrimary": 0,
                "artistName": "50 Cent",
                "artistImage": "https://i.scdn.co/image/6f0da41419b31d9d2ba55d2df212f59ad0668118",
                "artistDescription": "50 CENT"
            },
            {
                "artistID": 1003,
                "isPrimary": 0,
                "artistName": "Nate Dogg",
                "artistImage": "https://i.scdn.co/image/6ee73d7a40401620c5296011dedeea959bd039a0",
                "artistDescription": "NATE DOGG"
            }
        ]
    },
    {
        "songID": 6002,
        "albumID": 3002,
        "songName": "In Da Club",
        "songDuration": "00:03:50",
        "albumName": "Get Rich or Die Tryin",
        "albumImage": "https://i.scdn.co/image/ab67616d0000b2734c88e268c9dc19f79ccdbb97",
        "albumReleaseDate": "2023-08-24T22:00:00.000Z",
        "artists": [
            {
                "artistID": 1002,
                "isPrimary": 1,
                "artistName": "50 Cent",
                "artistImage": "https://i.scdn.co/image/6f0da41419b31d9d2ba55d2df212f59ad0668118",
                "artistDescription": "50 CENT"
            }
        ],
        "featuredArtists": []
    }
]
```
### GET /songs/albums/artists?[SEARCHVALUE]=[KEYWORD]
Enables the user to search for all songs that matches a pattern. There are three possible ```SEARCHVALUES```:
* ```artistName```: returns all songs, where the artistName match ```KEYWORD``` (wildcard search).
* ```albumName```: returns all songs, where the albumname match ```KEYWORD``` (wildcard search).
* ```songName```: returns all songs, where the songname match ```KEYWORD``` (wildcard search).

#### Example
```url
GET /songs/albums/artists?songName=in
```
RESPONSE:
```json
[
    {
        "songID": 6002,
        "albumID": 3002,
        "songName": "In Da Club",
        "songDuration": "00:03:50",
        "albumName": "Get Rich or Die Tryin",
        "albumImage": "https://i.scdn.co/image/ab67616d0000b2734c88e268c9dc19f79ccdbb97",
        "albumReleaseDate": "2023-08-24T22:00:00.000Z",
        "artists": [
            {
                "artistID": 1002,
                "isPrimary": 1,
                "artistName": "50 Cent",
                "artistImage": "https://i.scdn.co/image/6f0da41419b31d9d2ba55d2df212f59ad0668118",
                "artistDescription": "50 CENT"
            }
        ],
        "featuredArtists": []
    },
    {
        "songID": 6002,
        "albumID": 3004,
        "songName": "In Da Club",
        "songDuration": "00:03:50",
        "albumName": "Greatist Hits",
        "albumImage": "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
        "albumReleaseDate": "2023-07-09T22:00:00.000Z",
        "artists": [
            {
                "artistID": 1002,
                "isPrimary": 1,
                "artistName": "50 Cent",
                "artistImage": "https://i.scdn.co/image/6f0da41419b31d9d2ba55d2df212f59ad0668118",
                "artistDescription": "50 CENT"
            }
        ],
        "featuredArtists": []
    }
]
```

## GET /albums/:albumID/artists/songs
Returns all artists and songs info for a specific album

#### Example
```url
GET /albums/3001/artists/songs
```
RESPONSE:
```json
[
    {
        "albumID": 3001,
        "albumName": "Encore",
        "albumImage": "https://i.scdn.co/image/ab67616d0000b273dfd0ebe9b4b99f621f376453",
        "albumReleaseDate": "2023-09-14T22:00:00.000Z",
        "artists": [
            {
                "artistID": 1001,
                "artistName": "Eminem",
                "artistImage": "https://i.scdn.co/image/ab6761610000e5eba00b11c129b27a88fc72f36b",
                "artistDescription": "EMINEM"
            }
        ],
        "songs": [
            {
                "songID": 6001,
                "songName": "Never Enough\" (feat 50 Cent and Nate Dogg)",
                "songDuration": "00:04:15",
                "featuredArtists": [
                    {
                        "artistID": 1002,
                        "artistName": "50 Cent",
                        "artistImage": "https://i.scdn.co/image/6f0da41419b31d9d2ba55d2df212f59ad0668118",
                        "artistDescription": "50 CENT"
                    },
                    {
                        "artistID": 1003,
                        "artistName": "Nate Dogg",
                        "artistImage": "https://i.scdn.co/image/6ee73d7a40401620c5296011dedeea959bd039a0",
                        "artistDescription": "NATE DOGG"
                    }
                ]
            }
        ]
    }
]
```

## POST /albums/artists/songs
This endpoint lets the user create all resources at once. This endpoint supports linking existing artists and songs, as well as creating new artists and songs.

#### Example
Use this structure in the request body:
```json
{
    "albumName": "TEST ALBUM1",
    "albumImage": "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
    "albumReleaseDate": "1990-01-01",
    "artists": [
        {
            "artistID": 1001
        },
        {
            "artistID": 1002
        }
    ],
    "songs": [
        {
            "songName": "New test song 1",
            "songDuration": "00:10:00",
            "featuredArtists":[
                {
                    "artistName": "FeatArtist1",
                    "artistImage": "FeatArtist1",
                    "artistDescription": "FeatArtist1"
                },
                {
                    "artistID": 1003
                }
            ]
        },
        {
            "songName": "New test song 2",
            "songDuration": "00:10:00",
            "featuredArtists":[
                {
                    "artistID": 1004
                }
            ]
        }
    ]
}
```
The response code will be ```201``` for a succes and ```500``` for a failed request.

RESPONSE body of a succesfull request (status ```201```):
```json
[
  {
    "url": "/albums/[newAlbumID]/artists/songs"
  }
]
```
