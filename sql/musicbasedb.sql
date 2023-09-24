-- DROP DATABASE musicbasedb;

CREATE DATABASE musicbasedb;

USE musicbasedb;

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
    albumReleaseDate DATE
);

ALTER TABLE albums AUTO_INCREMENT=3001;

CREATE TABLE songs (
    songID INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    songName VARCHAR(255) NOT NULL,
    songDuration TIME
);

ALTER TABLE songs AUTO_INCREMENT=6001;


-- Junction table
CREATE TABLE albums_songs (
    albumID INT,
    songID INT,
    trackNo INT,
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
    isPrimary BOOLEAN,
    PRIMARY KEY (artistID, songID),
    FOREIGN KEY (artistID) REFERENCES artists(artistID),
    FOREIGN KEY (songID) REFERENCES songs(songID)
);

-- ADDING TEST DATA
-- Insert data into artists table
INSERT INTO artists (artistName, artistImage, artistDescription) VALUES
    ('Eminem', 'https://i.scdn.co/image/ab6761610000e5eba00b11c129b27a88fc72f36b', 'EMINEM'),
    ('50 Cent', 'https://i.scdn.co/image/6f0da41419b31d9d2ba55d2df212f59ad0668118', '50 CENT'),
    ('Nate Dogg', 'https://i.scdn.co/image/6ee73d7a40401620c5296011dedeea959bd039a0', 'NATE DOGG'),
    ('Lisa Davis', 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg', 'An emerging talent in the music industry.');

-- Insert data into albums table
INSERT INTO albums (albumName, albumImage, albumReleaseDate) VALUES
    ('Encore', 'https://i.scdn.co/image/ab67616d0000b273dfd0ebe9b4b99f621f376453', '2023-09-15'),
    ('Get Rich or Die Tryin', 'https://i.scdn.co/image/ab67616d0000b2734c88e268c9dc19f79ccdbb97', '2023-08-25'),
    ('Nate Dogg', 'https://i.scdn.co/image/ab67616d00001e029fb43ff89995801c3857d201', '2023-09-05'),
    ('Greatist Hits', 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg', '2023-07-10');

-- Insert data into songs table
INSERT INTO songs (songName, songDuration) VALUES
    ('Never Enough" (feat 50 Cent and Nate Dogg)', '00:04:15'),
    ('In Da Club', '00:03:50'),
    ('21 Questions (feat Nate Dogg)', '00:05:20'),
    ('P.I.M.P.', '00:03:30'),
    ('Round and Round', '00:04:45');

-- Insert data into junction tables
-- albums_songs
INSERT INTO albums_songs (albumID, songID, trackNo) VALUES
    (3001, 6001, 1),
    (3002, 6002, 1),
    (3002, 6003, 2),
    (3002, 6004, 3),
    (3003, 6005, 1),
    (3004, 6002, 1),
    (3004, 6005, 2);

-- artists_albums
INSERT INTO artists_albums (artistID, albumID) VALUES
    (1001, 3001),
    (1002, 3002),
    (1002, 3004),
    (1003, 3003),
    (1003, 3004);


-- artists_songs
INSERT INTO artists_songs (artistID, songID, isPrimary) VALUES
    (1001, 6001, true),
    (1002, 6001, false),
    (1003, 6001, false),
    (1002, 6002, true),
    (1002, 6003, true),
    (1003, 6003, false),
    (1002, 6004, true),
    (1003, 6005, true);