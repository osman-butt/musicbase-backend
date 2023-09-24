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

-- Insert Artist album and songs
INSERT INTO artists (artistName,artistImage,artistDescription)
VALUES
    ('Eminem','https://i.scdn.co/image/ab6761610000e5eb12e3f20d05a8d6cfde988715','Legendary rapper and songwriter recognized for his unique lyrical style and introspective themes.');
SELECT LAST_INSERT_ID();

INSERT INTO albums (albumName,albumImage,albumReleaseDate)
VALUES
    ('Encore','https://i.scdn.co/image/ab67616d0000b273c1bc1f29321daa504cc7f83b', '2004-11-12');
SELECT LAST_INSERT_ID();

INSERT INTO artists_albums (artistID, albumID)
VALUES
    (1001,3001);
SELECT LAST_INSERT_ID();

INSERT INTO songs (songName,songNo)
VALUES
    ('Curtains Up (skit)',1),
    ('Evil Deeds',2),
    ('Never Enough (featuring 50 Cent and Nate Dogg)',3),
    ('Yellow Brick Road',4),
    ('Like Toy Soldiers',5),
    ('Mosh',6),
    ('Puke',7),
    ('My 1st Single',8),
    ('Paul (skit)',9),
    ('Rain Man',10),
    ('Big Weenie',11),
    ('Em Calls Paul (skit)',12),
    ('Just Lose It',13),
    ('Ass Like That',14),
    ('Spend Some Time (featuring Obie Trice, Stat Quo and 50 Cent)',15),
    ('Mockingbird',16),
    ('Crazy in Love',17),
    ('One Shot 2 Shot (featuring D12)',18),
    ('Final Thought (skit)',19),
    ('Encore / Curtains Down (featuring Dr. Dre and 50 Cent)',20);
SELECT LAST_INSERT_ID();

INSERT INTO artists_songs (artistID, songID)
VALUES
    (1001,6001),
    (1001,6002),
    (1001,6003),
    (1001,6004),
    (1001,6005),
    (1001,6006),
    (1001,6007),
    (1001,6008),
    (1001,6009),
    (1001,6010),
    (1001,6011),
    (1001,6012),
    (1001,6013),
    (1001,6014),
    (1001,6015),
    (1001,6016),
    (1001,6017),
    (1001,6018),
    (1001,6019),
    (1001,6020);

INSERT INTO albums_songs (albumID, songID)
VALUES
    (3001,6001),
    (3001,6002),
    (3001,6003),
    (3001,6004),
    (3001,6005),
    (3001,6006),
    (3001,6007),
    (3001,6008),
    (3001,6009),
    (3001,6010),
    (3001,6011),
    (3001,6012),
    (3001,6013),
    (3001,6014),
    (3001,6015),
    (3001,6016),
    (3001,6017),
    (3001,6018),
    (3001,6019),
    (3001,6020);

-- Insert featurings
INSERT INTO artists (artistName,artistImage,artistDescription)
VALUES
    ('Nate Dogg','https://i.scdn.co/image/6ee73d7a40401620c5296011dedeea959bd039a0',''),
    ('50 Cent','https://i.scdn.co/image/dd031b9c5d1b6eba4a691cd89c954255aae787f2',''),
    ('Obie Trice','https://i.scdn.co/image/13998fd88695a34cec8350675cb3ceffa4573ae3',''),
    ('Stat Quo','https://i.scdn.co/image/ab67616d0000b2730c22a21b04cab404b79f5d82',''),
    ('D12','https://i.scdn.co/image/ab6761610000e5eb4f52827861ae9b860a5e62f6',''),
    ('Dr. Dre','https://i.scdn.co/image/170254ebdd747f4e7045df1cae8f11a42dc1a547','');

INSERT INTO artistsfeat_songs (artistID, songID)
VALUES
    (1003,6003),
    (1002,6003),
    (1004,6015),
    (1005,6015),
    (1003,6015),
    (1006,6018),
    (1007,6020),
    (1003,6020);

-- #### Query examples #####

-- See all feat on an album
-- SELECT albums.albumName as album, artists.artistName as artists, songs.songName as song
SELECT DISTINCT(artists.artistName) as artists
FROM albums
JOIN artists_albums ON artists_albums.albumID = albums.albumID
JOIN albums_songs ON albums_songs.albumID = albums.albumID
JOIN songs on albums_songs.songID = songs.songID
JOIN artistsfeat_songs ON artistsfeat_songs.songID = songs.songID
JOIN artists ON artistsfeat_songs.artistID = artists.artistID
WHERE albums.albumID=3001;

-- See primary artist for an album
SELECT artists.artistName as artist
FROM albums
JOIN artists_albums ON artists_albums.albumID = albums.albumID
JOIN artists ON artists_albums.artistID = artists.artistID
WHERE albums.albumID=3001;

-- See artists with albums
SELECT * FROM albums
JOIN artists_albums ON artists_albums.albumID = albums.albumID
JOIN artists ON artists_albums.artistID = artists.artistID;


SELECT artists.artistID, artists.artistName, albums.albumID, albums.albumName
FROM artists
JOIN artists_albums ON artists.artistID = artists_albums.artistID
JOIN albums ON artists_albums.albumID = albums.albumID;

-- See songs for a specific album
SELECT albums.albumName as album, albums.albumReleaseDate as ReleaseDate ,songs.songName as song
FROM songs
JOIN albums_songs ON albums_songs.songID = songs.songID
JOIN albums on albums_songs.albumID = albums.albumID
ORDER BY albums.albumName;

-- See albums for a specific artist
SELECT artists.artistName as artist ,albums.albumName as album, albums.albumReleaseDate as releaseDate
FROM albums
JOIN artists_albums ON artists_albums.albumID = albums.albumID
JOIN artists on artists_albums.artistID = artists.artistID
WHERE artists.artistID=1001;

-- See all songs for a specific artist
SELECT artists.artistName as artist, albums.albumName as album, songs.songName as songs
FROM albums
JOIN artists_albums ON artists_albums.albumID = albums.albumID
JOIN artists on artists_albums.artistID = artists.artistID
JOIN albums_songs ON albums_songs.albumID = albums.albumID
JOIN songs on albums_songs.songID = songs.songID
WHERE artists.artistID=1001;


-- Insert artists
INSERT INTO artists (artistName,artistDescription)
VALUES
    -- ('Eminem','Legendary rapper and songwriter recognized for his unique lyrical style and introspective themes.'),
    ('Beyoncé','Iconic R&B and pop artist known for her powerful vocals and captivating performances.'),
    ('Rihanna','Chart-topping pop and R&B artist known for her versatile musical style and fashion influence.'),
    ('Adele','Soulful pop artist acclaimed for her emotive voice and heartfelt ballads.'),
    ('Coldplay','Internationally renowned band known for their atmospheric rock sound and anthemic hits.'),
    ('Taylor Swift','Multi-genre artist recognized for her narrative songwriting and chart-topping hits.'),
    ('Kendrick Lamar','Influential rapper known for his socially conscious lyrics and innovative sound.'),
    ('Justin Timberlake','Singer-songwriter and entertainer celebrated for his pop and R&B hits as well as acting career.'),
    ('Drake','Iconic R&B and pop artist known for her powerful vocals and captivating performances.'),
    ('Beyoncé','Rapper, singer, and songwriter with numerous chart-topping hits and a dominant presence in hip-hop.'),
    ('The Weeknd','Alternative R&B artist with a distinct voice and a blend of pop and electronic influences.');

INSERT INTO albums (albumName,albumReleaseDate)
VALUES
    ('Infinite', '1996-11-12'),
    ('The Slim Shady EP', '1997-12-16'),
    ('The Slim Shady LP', '1999-02-23'),
    ('The Marshall Mathers LP', '2000-05-23'),
    ('The Eminem Show', '2002-05-26'),
    ('Encore', '2004-11-12'),
    ('Relapse', '2009-05-15'),
    ('Recovery', '2010-06-18'),
    ('The Marshall Mathers LP 2', '2013-11-05'),
    ('Revival', '2017-12-15'),
    ('Kamikaze', '2018-08-31'),
    ('Music to Be Murdered By', '2020-01-17');

INSERT INTO artists_albums (artistID, albumID)
VALUES
    (1001,3002),
    (1001,3003),
    (1001,3004),
    (1001,3005),
    (1001,3006),
    (1001,3007),
    (1001,3008),
    (1001,3009),
    (1001,3010),
    (1001,3011),
    (1001,3012),
    (1001,3013);


INSERT INTO albums (name,releaseDate)
VALUES
    ('Thank Me Later', '2010-06-15'),
    ('Take Care', '2011-11-15'),
    ('Nothing Was the Same', '2013-09-24'),
    ('If You\'re Reading This It\'s Too Late', '2015-02-12'),
    ('Views', '2016-04-29'),
    ('More Life', '2017-03-18'),
    ('Scorpion', '2018-06-29'),
    ('Dark Lane Demo Tapes', '2020-05-01'),
    ('Certified Lover Boy', '2021-09-03');


INSERT INTO songs (name,trackNo)
VALUES
    ('Curtains Up (skit)', 1),
    ('Evil Deeds', 2),
    ('Never Enough (featuring 50 Cent and Nate Dogg)', 3),
    ('Yellow Brick Road', 4),
    ('Like Toy Soldiers', 5),
    ('Mosh', 6),
    ('Puke', 7),
    ('My 1st Single', 8),
    ('Paul (skit)', 9),
    ('Rain Man', 10),
    ('Big Weenie', 11),
    ('Em Calls Paul (skit)', 12),
    ('Just Lose It', 13),
    ('Ass Like That', 14),
    ('Spend Some Time (featuring Obie Trice, Stat Quo and 50 Cent)', 15),
    ('Mockingbird', 16),
    ('Crazy in Love', 17),
    ('One Shot 2 Shot (featuring D12)', 18),
    ('Final Thought (skit)', 19),
    ('Encore / Curtains Down (featuring Dr. Dre and 50 Cent)', 20);

INSERT INTO songs (name,trackNo)
values
    ('Intro (Slim Shady)', 1),
    ('Low Down, Dirty', 2),
    ('If I Had...', 3),
    ('Just Don\'t Give a Fuck', 4),
    ('Mommy (skit)', 5),
    ('Just the Two of Us', 6),
    ('No One\'s Iller (featuring Swifty McVay, Bizarre and Fuzz Scoota)', 7),
    ('Murder, Murder', 8);

INSERT INTO songs (name,trackNo)
VALUES
    ('Over My Dead Body', 1),
    ('Shot for Me', 2),
    ('Headlines', 3),
    ('Crew Love (featuring the Weeknd)', 4),
    ('Take Care (featuring Rihanna)', 5),
    ('Marvins Room', 6),
    ('Buried Alive Interlude (Performed by Kendrick Lamar)', 7),
    ('Under Ground Kings', 8),
    ('We\'ll Be Fine (featuring Birdman)', 9),
    ('Make Me Proud (featuring Nicki Minaj)', 10),
    ('Lord Knows (featuring Rick Ross)', 11),
    ('Cameras / Good Ones Go Interlude', 12),
    ('Doing It Wrong', 13),
    ('The Real Her (featuring Lil Wayne and André 3000)', 14),
    ('Look What You\'ve Done', 15),
    ('HYFR (Hell Ya Fucking Right) (featuring Lil Wayne)', 16),
    ('Practice', 17),
    ('The Ride', 18);


SELECT *
      FROM artists
      INNER JOIN artists_albums ON artists.artistID = artists_albums.artistID
      INNER JOIN albums ON artists_albums.albumID = albums.albumID WHERE artists.artistID=1001;

SELECT DISTINCT albums.albumID,albums.albumName,albums.albumImage,albums.albumReleaseDate, songs.*, artists.*
        FROM artists
        LEFT JOIN artists_albums ON artists.artistID = artists_albums.artistID
        LEFT JOIN albums ON artists_albums.albumID = albums.albumID
        LEFT JOIN albums_songs ON albums.albumID = albums_songs.albumID
        LEFT JOIN songs ON albums_songs.songID = songs.songID
        WHERE artists.artistID=1001 AND albums.albumID=3001;