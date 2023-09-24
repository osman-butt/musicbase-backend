-- DROP DATABASE musicbase_db;

-- Create Database
CREATE DATABASE musicbase_db;

USE musicbase_db;

-- Create tables
CREATE TABLE artists (
    artistID INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    artistName varchar(255) NOT NULL,
    artistImage text,
    artistDescription text
);

ALTER TABLE artists AUTO_INCREMENT=1001;

CREATE TABLE albums (
    albumID INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    albumName varchar(255) NOT NULL,
    albumImage text,
    albumReleaseDate varchar(10)
);

ALTER TABLE albums AUTO_INCREMENT=3001;

CREATE TABLE songs (
    songID INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    songName varchar(255) NOT NULL,
    songNo INT
);

ALTER TABLE songs AUTO_INCREMENT=6001;

-- Junction table
CREATE TABLE albums_songs (
    albumID INT,
    songID INT,
    PRIMARY KEY (albumID, songID),
    FOREIGN KEY (albumID) REFERENCES albums(albumID),
    FOREIGN KEY (songID) REFERENCES songs(songID)
);

CREATE TABLE artists_albums (
    artistID INT,
    albumID INT,
    PRIMARY KEY (artistID, albumID),
    FOREIGN KEY (artistID) REFERENCES artists(artistID),
    FOREIGN KEY (albumID) REFERENCES albums(albumID)
);

CREATE TABLE artists_songs (
    artistID INT,
    songID INT,
    PRIMARY KEY (artistID, songID),
    FOREIGN KEY (artistID) REFERENCES artists(artistID),
    FOREIGN KEY (songID) REFERENCES songs(songID)
);
