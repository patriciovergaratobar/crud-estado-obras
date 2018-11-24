-- MySQL dump 10.13  Distrib 5.7.23, for Linux (x86_64)
--
-- Host: localhost    Database: estado_obras
-- ------------------------------------------------------
-- Server version	5.7.23-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `archivos`
--

DROP TABLE IF EXISTS `archivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `archivos` (
  `fotoid` int(11) NOT NULL AUTO_INCREMENT,
  `archivos` blob NOT NULL,
  `comentario` varchar(300) DEFAULT NULL,
  `tipoArchivo` varchar(45) NOT NULL,
  `estadosObrasId` int(11) NOT NULL,
  PRIMARY KEY (`fotoid`,`estadosObrasId`),
  KEY `fk_archivos_estadosObras1_idx` (`estadosObrasId`),
  CONSTRAINT `fk_archivos_estadosObras1` FOREIGN KEY (`estadosObrasId`) REFERENCES `estadosObras` (`estadosObrasId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archivos`
--

LOCK TABLES `archivos` WRITE;
/*!40000 ALTER TABLE `archivos` DISABLE KEYS */;
INSERT INTO `archivos` VALUES (1,_binary 'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7','es una prueba','png',1),(2,_binary 'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7','es una prueba 2 -','png',1);
/*!40000 ALTER TABLE `archivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresas` (
  `empresaId` int(11) NOT NULL AUTO_INCREMENT,
  `nombreEmpresa` varchar(145) DEFAULT NULL,
  `logo` varchar(145) DEFAULT NULL,
  `rutEmpresa` varchar(17) DEFAULT NULL,
  `direccion` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`empresaId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,'ENAVIA','','1-9','');
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadosObras`
--

DROP TABLE IF EXISTS `estadosObras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estadosObras` (
  `estadosObrasId` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(145) NOT NULL,
  `fecha` datetime NOT NULL,
  `comentario` varchar(300) DEFAULT NULL,
  `obraId` int(11) NOT NULL,
  PRIMARY KEY (`estadosObrasId`),
  KEY `fk_estadosObras_obras1_idx` (`obraId`),
  CONSTRAINT `fk_estadosObras_obras1` FOREIGN KEY (`obraId`) REFERENCES `obras` (`obraId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadosObras`
--

LOCK TABLES `estadosObras` WRITE;
/*!40000 ALTER TABLE `estadosObras` DISABLE KEYS */;
INSERT INTO `estadosObras` VALUES (1,'Primera toma','2018-09-01 00:00:00','Esta fue una prueba',1),(2,'Primera semana','2018-01-01 00:00:00','Ejemplo de estado',1);
/*!40000 ALTER TABLE `estadosObras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obras`
--

DROP TABLE IF EXISTS `obras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `obras` (
  `obraId` int(11) NOT NULL AUTO_INCREMENT,
  `nombreObra` varchar(145) NOT NULL,
  `codObra` varchar(45) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `fechaInicio` datetime DEFAULT NULL,
  `proyectosId` int(11) NOT NULL,
  PRIMARY KEY (`obraId`,`proyectosId`),
  KEY `fk_obras_proyectos1_idx` (`proyectosId`),
  CONSTRAINT `fk_obras_proyectos1` FOREIGN KEY (`proyectosId`) REFERENCES `proyectos` (`proyectosId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obras`
--

LOCK TABLES `obras` WRITE;
/*!40000 ALTER TABLE `obras` DISABLE KEYS */;
INSERT INTO `obras` VALUES (1,'Pandaderia A','PADA','Las palmas 1232','2018-03-01 00:00:00',1),(2,'Obra A Nueva 2 -1',NULL,'Canto 123, La cisterna','2018-01-01 00:00:00',1);
/*!40000 ALTER TABLE `obras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proyectos` (
  `proyectosId` int(11) NOT NULL AUTO_INCREMENT,
  `nombreProyecto` varchar(100) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `empresaId` int(11) NOT NULL,
  PRIMARY KEY (`proyectosId`,`empresaId`),
  KEY `fk_proyectos_empresas1_idx` (`empresaId`),
  CONSTRAINT `fk_proyectos_empresas1` FOREIGN KEY (`empresaId`) REFERENCES `empresas` (`empresaId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES (1,'Tesla','Proyecto de prueba...',1),(2,'Nueva Real 2s','Proyecto de prueba 2...',1);
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `rut` varchar(17) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(128) NOT NULL,
  `createtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `tipoPerfil` varchar(45) DEFAULT NULL,
  `activo` int(11) DEFAULT NULL,
  `token` varchar(256) DEFAULT NULL,
  `empresaId` int(11) NOT NULL,
  PRIMARY KEY (`rut`),
  KEY `fk_user_empresas_idx` (`empresaId`),
  CONSTRAINT `fk_user_empresas` FOREIGN KEY (`empresaId`) REFERENCES `empresas` (`empresaId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('1-2','PVERGARA@MAIL.COM','12345','2018-11-24 15:33:58','ADMINISTRADOR','ENAVIA','ADMIN',1,NULL,1),('1-3','PVERGARA@MAIL.COM','12345','2018-11-24 16:57:56','ADMINISTRADOR','ENAVIA','ADMIN',1,NULL,1),('1-9','PVERGARA@MAIL.COM','12345','2018-11-24 15:03:03','ADMINISTRADOR','ENAVIA','ADMIN',1,'MC4wMDg2ODcwMCAxNTQzMDc3OTA0',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-24 18:49:16
