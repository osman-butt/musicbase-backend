-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: musicbasedb
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albums` (
  `albumID` int NOT NULL AUTO_INCREMENT,
  `albumName` varchar(255) NOT NULL,
  `albumImage` text,
  `albumReleaseDate` date DEFAULT NULL,
  PRIMARY KEY (`albumID`)
) ENGINE=InnoDB AUTO_INCREMENT=3032 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` VALUES (3001,'Encore','https://i.scdn.co/image/ab67616d0000b273dfd0ebe9b4b99f621f376453','2023-09-15'),(3002,'Get Rich or Die Tryin','https://i.scdn.co/image/ab67616d0000b2734c88e268c9dc19f79ccdbb97','2023-08-25'),(3003,'Nate Dogg','https://i.scdn.co/image/ab67616d00001e029fb43ff89995801c3857d201','2023-09-05'),(3004,'Greatist Hits','https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg','2023-07-10'),(3025,'Scorpion','https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5','2018-06-29'),(3026,'I Am... Sasha Fierce','https://i.scdn.co/image/ab67616d0000b273801c4d205accdba0a468a10b','2008-11-18'),(3027,'Good Girl Gone Bad','https://i.scdn.co/image/ab67616d0000b273b9ff0a5f40d3406aed5e5e3b','2007-05-31'),(3028,'21','https://i.scdn.co/image/ab67616d0000b2732118bf9b198b05a95ded6300','2011-01-24'),(3030,'Good Kid, M.A.A.D City','https://i.scdn.co/image/ab67616d0000b273d28d2ebdedb220e479743797','2012-10-22'),(3031,'2001','https://i.scdn.co/image/ab67616d0000b2739b19c107109de740bad72df5','1999-11-05');
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `albums_songs`
--

DROP TABLE IF EXISTS `albums_songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albums_songs` (
  `albumID` int NOT NULL,
  `songID` int NOT NULL,
  `trackNo` int DEFAULT NULL,
  PRIMARY KEY (`albumID`,`songID`),
  KEY `songID` (`songID`),
  CONSTRAINT `albums_songs_ibfk_1` FOREIGN KEY (`albumID`) REFERENCES `albums` (`albumID`),
  CONSTRAINT `albums_songs_ibfk_2` FOREIGN KEY (`songID`) REFERENCES `songs` (`songID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums_songs`
--

LOCK TABLES `albums_songs` WRITE;
/*!40000 ALTER TABLE `albums_songs` DISABLE KEYS */;
INSERT INTO `albums_songs` VALUES (3001,6001,1),(3002,6002,1),(3002,6003,2),(3002,6004,3),(3003,6005,1),(3004,6002,1),(3004,6005,2),(3025,6043,1),(3025,6044,2),(3026,6045,1),(3026,6046,2),(3026,6047,3),(3027,6048,1),(3027,6049,2),(3027,6050,3),(3028,6051,1),(3028,6052,2),(3030,6055,1),(3030,6056,2),(3031,6057,1),(3031,6058,2);
/*!40000 ALTER TABLE `albums_songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists` (
  `artistID` int NOT NULL AUTO_INCREMENT,
  `artistName` varchar(255) NOT NULL,
  `artistImage` text,
  `artistDescription` text,
  PRIMARY KEY (`artistID`)
) ENGINE=InnoDB AUTO_INCREMENT=1022 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--

LOCK TABLES `artists` WRITE;
/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists` VALUES (1001,'Eminem','https://i.scdn.co/image/ab6761610000e5eba00b11c129b27a88fc72f36b','EMINEM'),(1002,'50 Cent','https://i.scdn.co/image/6f0da41419b31d9d2ba55d2df212f59ad0668118','50 CENT'),(1003,'Nate Dogg','https://i.scdn.co/image/6ee73d7a40401620c5296011dedeea959bd039a0','NATE DOGG'),(1014,'Drake','https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9','Rapper, singer, and songwriter with numerous chart-topping hits and a dominant presence in hip-hop.'),(1015,'Beyoncé','https://i.scdn.co/image/ab6761610000e5eb12e3f20d05a8d6cfde988715','Iconic R&B and pop artist known for her powerful vocals and captivating performances.'),(1016,'Rihanna','https://i.scdn.co/image/ab6761610000e5eb99e4fca7c0b7cb166d915789','Chart-topping pop and R&B artist known for her versatile musical style and fashion influence.'),(1017,'Adele','https://i.scdn.co/image/ab67616d00001e0247ce408fb4926d69da6713c2','Soulful pop artist acclaimed for her emotive voice and heartfelt ballads.'),(1019,'Kendrick Lamar','https://i.scdn.co/image/ab6775700000ee8582775e2485ead59dd0b2b5e3','Influential rapper known for his socially conscious lyrics and innovative sound.'),(1020,'Dr. Dre','https://i.scdn.co/image/83d2489cade1dadcdc533ddbcd74993d0ca6d4cb','An American rapper and record producer.'),(1021,'Snoop Dogg','https://i.scdn.co/image/ab6761610000e5eb9a398209a4ef3360dce2dec4','Snoop Dogg is an American rapper, singer, songwriter, producer, media personality, entrepreneur, and actor.');
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artists_albums`
--

DROP TABLE IF EXISTS `artists_albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists_albums` (
  `artistID` int NOT NULL,
  `albumID` int NOT NULL,
  PRIMARY KEY (`artistID`,`albumID`),
  KEY `albumID` (`albumID`),
  CONSTRAINT `artists_albums_ibfk_1` FOREIGN KEY (`artistID`) REFERENCES `artists` (`artistID`),
  CONSTRAINT `artists_albums_ibfk_2` FOREIGN KEY (`albumID`) REFERENCES `albums` (`albumID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists_albums`
--

LOCK TABLES `artists_albums` WRITE;
/*!40000 ALTER TABLE `artists_albums` DISABLE KEYS */;
INSERT INTO `artists_albums` VALUES (1001,3001),(1002,3002),(1003,3003),(1002,3004),(1003,3004),(1014,3025),(1015,3026),(1016,3027),(1017,3028),(1019,3030),(1020,3031);
/*!40000 ALTER TABLE `artists_albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artists_songs`
--

DROP TABLE IF EXISTS `artists_songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists_songs` (
  `artistID` int NOT NULL,
  `songID` int NOT NULL,
  `isPrimary` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`artistID`,`songID`),
  KEY `songID` (`songID`),
  CONSTRAINT `artists_songs_ibfk_1` FOREIGN KEY (`artistID`) REFERENCES `artists` (`artistID`),
  CONSTRAINT `artists_songs_ibfk_2` FOREIGN KEY (`songID`) REFERENCES `songs` (`songID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists_songs`
--

LOCK TABLES `artists_songs` WRITE;
/*!40000 ALTER TABLE `artists_songs` DISABLE KEYS */;
INSERT INTO `artists_songs` VALUES (1001,6001,1),(1001,6057,0),(1002,6001,0),(1002,6002,1),(1002,6003,1),(1002,6004,1),(1003,6001,0),(1003,6003,0),(1003,6005,1),(1014,6043,1),(1014,6044,1),(1014,6055,0),(1015,6045,1),(1015,6046,1),(1015,6047,1),(1016,6048,1),(1016,6049,1),(1016,6050,1),(1017,6051,1),(1017,6052,1),(1019,6055,1),(1019,6056,1),(1020,6056,0),(1020,6057,1),(1020,6058,1),(1021,6058,0);
/*!40000 ALTER TABLE `artists_songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `songID` int NOT NULL AUTO_INCREMENT,
  `songName` varchar(255) NOT NULL,
  `songDuration` time DEFAULT NULL,
  PRIMARY KEY (`songID`)
) ENGINE=InnoDB AUTO_INCREMENT=6059 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (6001,'Never Enough\" (feat 50 Cent and Nate Dogg)','00:04:15'),(6002,'In Da Club','00:03:50'),(6003,'21 Questions (feat Nate Dogg)','00:05:20'),(6004,'P.I.M.P.','00:03:30'),(6005,'Round and Round','00:04:45'),(6043,'Don\'t Matter To Me','00:04:06'),(6044,'God\'s Plan','00:04:50'),(6045,'Single Ladies (Put A Ring On It)','00:04:06'),(6046,'Halo','00:04:17'),(6047,'Ave Maria','00:03:42'),(6048,'Umbrella','00:04:36'),(6049,'Don\'t Stop the Music','00:04:27'),(6050,'Shut Up and Drive','00:03:33'),(6051,'Someone Like You','00:04:45'),(6052,'Love Song','00:03:48'),(6055,'Poetic Justice','00:05:00'),(6056,'Compton','00:03:48'),(6057,'Forgot About Dre (Explicit)','00:03:43'),(6058,'Still D.R.E.','00:04:31');
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-24 18:45:53
