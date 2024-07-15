CREATE DATABASE  IF NOT EXISTS `sena_practicas2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sena_practicas2`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: sena_practicas2
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aprendices`
--

DROP TABLE IF EXISTS `aprendices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aprendices` (
  `id_aprendiz` int NOT NULL AUTO_INCREMENT,
  `nombre_aprendiz` varchar(100) NOT NULL,
  `apellido_aprendiz` varchar(100) NOT NULL,
  `tipo_documento_aprendiz` varchar(50) NOT NULL,
  `numero_documento_aprendiz` varchar(100) NOT NULL,
  `email_aprendiz` varchar(500) DEFAULT NULL,
  `celular_aprendiz` varchar(100) DEFAULT NULL,
  `fecha_fin_practica_aprendiz` date DEFAULT NULL,
  `estado_aprendiz` varchar(300) NOT NULL,
  `id_empresa` int DEFAULT NULL,
  `id_modalidad` int DEFAULT NULL,
  `id_jefe` int DEFAULT NULL,
  `id_arl` int DEFAULT NULL,
  `id_contrato` int DEFAULT NULL,
  PRIMARY KEY (`id_aprendiz`),
  KEY `id_empresa` (`id_empresa`),
  KEY `id_modalidad` (`id_modalidad`),
  KEY `id_jefe` (`id_jefe`),
  KEY `id_arl` (`id_arl`),
  KEY `aprendices_ibfk_5_idx` (`id_contrato`),
  CONSTRAINT `aprendices_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `aprendices_ibfk_2` FOREIGN KEY (`id_modalidad`) REFERENCES `modalidades` (`id_modalidad`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `aprendices_ibfk_3` FOREIGN KEY (`id_jefe`) REFERENCES `jefes` (`id_jefe`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `aprendices_ibfk_4` FOREIGN KEY (`id_arl`) REFERENCES `arl` (`id_arl`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `aprendices_ibfk_5` FOREIGN KEY (`id_contrato`) REFERENCES `contratos_aprendizajes` (`id_contratos_aprendizaje`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=447 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprendices`
--

LOCK TABLES `aprendices` WRITE;
/*!40000 ALTER TABLE `aprendices` DISABLE KEYS */;
/*!40000 ALTER TABLE `aprendices` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `aprendices_crear_cartas` AFTER INSERT ON `aprendices` FOR EACH ROW BEGIN
	DECLARE ID_aprendiz INT;
	DECLARE ID_carta_inicio_creada INT;
	DECLARE ID_carta_fin_creada INT;
    SET ID_aprendiz = NEW.id_aprendiz;
    INSERT INTO aprendices_cartas (tipo_carta_aprendiz, estado_carta_aprendiz) VALUES ('inicio', 'No presentado');
	SET ID_carta_inicio_creada = LAST_INSERT_ID();
    
    INSERT INTO aprendices_cartas (tipo_carta_aprendiz, estado_carta_aprendiz) VALUES ('fin', 'No presentado');
    SET ID_carta_fin_creada = last_insert_id();
    
    INSERT INTO aprendices_cartas_detalles (id_aprendiz, id_carta_aprendiz) VALUES (ID_aprendiz, ID_carta_inicio_creada), (ID_aprendiz, ID_carta_fin_creada);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `aprendices_crear_visitas` AFTER INSERT ON `aprendices` FOR EACH ROW BEGIN
    DECLARE ID_aprendiz INT;
    DECLARE ID_visita INT;
    DECLARE i INT DEFAULT 1;    
    SET ID_aprendiz = NEW.id_aprendiz;
    
    WHILE i <= 2 DO
        INSERT INTO aprendices_visitas (numero_visita) VALUES (i);
        SET ID_visita = last_insert_id();
        INSERT INTO aprendices_visitas_detalles (id_aprendiz, id_visita) VALUES (ID_aprendiz, ID_visita);
        SET i = i + 1;
    END WHILE;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `aprendices_crear_bitacoras` AFTER INSERT ON `aprendices` FOR EACH ROW BEGIN
	DECLARE ID_aprendiz INT;
	DECLARE ID_bitacora INT;

	DECLARE fecha_fin_practica DATE;
    DECLARE fecha_inicio_practicas DATE;
    DECLARE fecha_15_dias DATE;
    DECLARE i INT DEFAULT 1;
    
    SET fecha_fin_practica = NEW.fecha_fin_practica_aprendiz;
	SET fecha_inicio_practicas = DATE_SUB(fecha_fin_practica, INTERVAL 6 MONTH);
    SET ID_aprendiz = NEW.id_aprendiz;

-- Bucle para calcular las 12 fechas
	WHILE i <= 12 DO
		
        # Insertar bitácora
        INSERT INTO aprendices_bitacoras (numero_bitacora) VALUES (i);
        SET ID_bitacora = last_insert_id();
        INSERT INTO aprendices_bitacoras_detalles(id_aprendiz, id_bitacora) VALUES (ID_aprendiz, ID_bitacora);
        SET i = i + 1;
	END WHILE;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `aprendices_bitacoras`
--

DROP TABLE IF EXISTS `aprendices_bitacoras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aprendices_bitacoras` (
  `id_bitacora` int NOT NULL AUTO_INCREMENT,
  `calificacion_bitacora` varchar(45) DEFAULT NULL,
  `observaciones_bitacora` varchar(500) DEFAULT NULL,
  `numero_bitacora` int NOT NULL,
  `usuario_responsable` int DEFAULT NULL,
  `fecha_modificacion` timestamp NOT NULL,
  `fecha_entrega` datetime DEFAULT NULL,
  PRIMARY KEY (`id_bitacora`),
  KEY `fk_usuario_responsable_edita_idx` (`usuario_responsable`),
  CONSTRAINT `fk_usuario_responsable_edita` FOREIGN KEY (`usuario_responsable`) REFERENCES `usuarios` (`id_usuario`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5090 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprendices_bitacoras`
--

LOCK TABLES `aprendices_bitacoras` WRITE;
/*!40000 ALTER TABLE `aprendices_bitacoras` DISABLE KEYS */;
/*!40000 ALTER TABLE `aprendices_bitacoras` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `aprendices_bitacoras_BEFORE_INSERT` BEFORE INSERT ON `aprendices_bitacoras` FOR EACH ROW BEGIN
	SET @fecha_actual = current_timestamp();
    SET NEW.fecha_modificacion = @fecha_actual;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `aprendices_bitacoras_BEFORE_UPDATE` BEFORE UPDATE ON `aprendices_bitacoras` FOR EACH ROW BEGIN
	SET @fecha_actual = current_timestamp();
    SET NEW.fecha_modificacion = @fecha_actual;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `aprendices_bitacoras_detalles`
--

DROP TABLE IF EXISTS `aprendices_bitacoras_detalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aprendices_bitacoras_detalles` (
  `id_aprendiz_bitacora_detalle` int NOT NULL AUTO_INCREMENT,
  `id_aprendiz` int NOT NULL,
  `id_bitacora` int DEFAULT NULL,
  PRIMARY KEY (`id_aprendiz_bitacora_detalle`),
  KEY `fk_idaprendiz_bitacoraD_idx` (`id_aprendiz`),
  KEY `fk_idbitacora_bitacoraD_idx` (`id_bitacora`),
  CONSTRAINT `fk_idaprendiz_bitacoraD` FOREIGN KEY (`id_aprendiz`) REFERENCES `aprendices` (`id_aprendiz`) ON UPDATE CASCADE,
  CONSTRAINT `fk_idbitacora_bitacoraD` FOREIGN KEY (`id_bitacora`) REFERENCES `aprendices_bitacoras` (`id_bitacora`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprendices_bitacoras_detalles`
--

LOCK TABLES `aprendices_bitacoras_detalles` WRITE;
/*!40000 ALTER TABLE `aprendices_bitacoras_detalles` DISABLE KEYS */;
/*!40000 ALTER TABLE `aprendices_bitacoras_detalles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aprendices_cartas`
--

DROP TABLE IF EXISTS `aprendices_cartas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aprendices_cartas` (
  `id_carta_aprendiz` int NOT NULL AUTO_INCREMENT,
  `tipo_carta_aprendiz` varchar(45) NOT NULL,
  `estado_carta_aprendiz` varchar(45) DEFAULT NULL,
  `observaciones` varchar(200) DEFAULT NULL,
  `fecha_modificacion` timestamp NOT NULL,
  `usuario_responsable` int DEFAULT NULL,
  PRIMARY KEY (`id_carta_aprendiz`),
  KEY `usuario_responsable_Fk_idx` (`usuario_responsable`),
  CONSTRAINT `usuario_responsable_Fk` FOREIGN KEY (`usuario_responsable`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=861 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprendices_cartas`
--

LOCK TABLES `aprendices_cartas` WRITE;
/*!40000 ALTER TABLE `aprendices_cartas` DISABLE KEYS */;
/*!40000 ALTER TABLE `aprendices_cartas` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `actualizar_fecha_modificacion` BEFORE INSERT ON `aprendices_cartas` FOR EACH ROW BEGIN
	SET @fecha_actual = current_timestamp();
    SET NEW.fecha_modificacion = @fecha_actual;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `aprendices_cartas_BEFORE_UPDATE` BEFORE UPDATE ON `aprendices_cartas` FOR EACH ROW BEGIN
	SET @fecha_actual = current_timestamp();
    SET NEW.fecha_modificacion = @fecha_actual;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `aprendices_cartas_detalles`
--

DROP TABLE IF EXISTS `aprendices_cartas_detalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aprendices_cartas_detalles` (
  `id_aprendiz_carta_detalle` int NOT NULL AUTO_INCREMENT,
  `id_aprendiz` int NOT NULL,
  `id_carta_aprendiz` int DEFAULT NULL,
  PRIMARY KEY (`id_aprendiz_carta_detalle`),
  KEY `fk_idaprendiz_cartasD_idx` (`id_aprendiz`),
  KEY `fk_idcarta_aprendiz_cartasD_idx` (`id_carta_aprendiz`),
  CONSTRAINT `fk_idaprendiz_cartasD` FOREIGN KEY (`id_aprendiz`) REFERENCES `aprendices` (`id_aprendiz`) ON UPDATE CASCADE,
  CONSTRAINT `fk_idcarta_aprendiz_cartasD` FOREIGN KEY (`id_carta_aprendiz`) REFERENCES `aprendices_cartas` (`id_carta_aprendiz`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprendices_cartas_detalles`
--

LOCK TABLES `aprendices_cartas_detalles` WRITE;
/*!40000 ALTER TABLE `aprendices_cartas_detalles` DISABLE KEYS */;
/*!40000 ALTER TABLE `aprendices_cartas_detalles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aprendices_visitas`
--

DROP TABLE IF EXISTS `aprendices_visitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aprendices_visitas` (
  `id_visita` int NOT NULL AUTO_INCREMENT,
  `numero_visita` varchar(100) NOT NULL,
  `estado_visita` varchar(45) DEFAULT 'Pendiente',
  `observaciones_visita` varchar(500) DEFAULT NULL,
  `usuario_responsable` int DEFAULT NULL,
  `fecha_modificacion` timestamp NOT NULL,
  `visita_hora` datetime DEFAULT NULL,
  `instructor` int DEFAULT NULL,
  PRIMARY KEY (`id_visita`),
  KEY `usuario_responsable_fk_idx` (`usuario_responsable`),
  CONSTRAINT `fk_usuario_responsable` FOREIGN KEY (`usuario_responsable`) REFERENCES `usuarios` (`id_usuario`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=805 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprendices_visitas`
--

LOCK TABLES `aprendices_visitas` WRITE;
/*!40000 ALTER TABLE `aprendices_visitas` DISABLE KEYS */;
/*!40000 ALTER TABLE `aprendices_visitas` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `aprendices_visitas_BEFORE_INSERT` BEFORE INSERT ON `aprendices_visitas` FOR EACH ROW BEGIN
  SET NEW.fecha_modificacion = current_timestamp();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `aprendices_visitas_BEFORE_UPDATE` BEFORE UPDATE ON `aprendices_visitas` FOR EACH ROW BEGIN
SET NEW.fecha_modificacion = current_timestamp();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `aprendices_visitas_detalles`
--

DROP TABLE IF EXISTS `aprendices_visitas_detalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aprendices_visitas_detalles` (
  `id_aprendiz_visita_detalle` int NOT NULL AUTO_INCREMENT,
  `id_aprendiz` int NOT NULL,
  `id_visita` int DEFAULT NULL,
  PRIMARY KEY (`id_aprendiz_visita_detalle`),
  KEY `fk_idaprendiz_visitasD_idx` (`id_aprendiz`),
  KEY `fk_idvisita_visitasD_idx` (`id_visita`),
  CONSTRAINT `fk_idaprendiz_visitasD` FOREIGN KEY (`id_aprendiz`) REFERENCES `aprendices` (`id_aprendiz`) ON UPDATE CASCADE,
  CONSTRAINT `fk_idvisita_visitasD` FOREIGN KEY (`id_visita`) REFERENCES `aprendices_visitas` (`id_visita`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprendices_visitas_detalles`
--

LOCK TABLES `aprendices_visitas_detalles` WRITE;
/*!40000 ALTER TABLE `aprendices_visitas_detalles` DISABLE KEYS */;
/*!40000 ALTER TABLE `aprendices_visitas_detalles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arl`
--

DROP TABLE IF EXISTS `arl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arl` (
  `id_arl` int NOT NULL AUTO_INCREMENT,
  `nombre_arl` varchar(200) NOT NULL,
  PRIMARY KEY (`id_arl`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arl`
--

LOCK TABLES `arl` WRITE;
/*!40000 ALTER TABLE `arl` DISABLE KEYS */;
INSERT INTO `arl` VALUES (1,'SENA'),(2,'Empresa'),(3,'No aplica');
/*!40000 ALTER TABLE `arl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `codigos_centros`
--

DROP TABLE IF EXISTS `codigos_centros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `codigos_centros` (
  `id_codigo_centro` int NOT NULL AUTO_INCREMENT,
  `numero_codigo_centro` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_codigo_centro`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `codigos_centros`
--

LOCK TABLES `codigos_centros` WRITE;
/*!40000 ALTER TABLE `codigos_centros` DISABLE KEYS */;
INSERT INTO `codigos_centros` VALUES (1,'920500');
/*!40000 ALTER TABLE `codigos_centros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contratos_aprendizajes`
--

DROP TABLE IF EXISTS `contratos_aprendizajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contratos_aprendizajes` (
  `id_contratos_aprendizaje` int NOT NULL AUTO_INCREMENT,
  `fecha_inicio_contrato` date DEFAULT NULL,
  `fecha_fin_contrato` date DEFAULT NULL,
  `estado_contrato` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_contratos_aprendizaje`)
) ENGINE=InnoDB AUTO_INCREMENT=226 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contratos_aprendizajes`
--

LOCK TABLES `contratos_aprendizajes` WRITE;
/*!40000 ALTER TABLE `contratos_aprendizajes` DISABLE KEYS */;
/*!40000 ALTER TABLE `contratos_aprendizajes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_empresas`
--

DROP TABLE IF EXISTS `detalle_empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_empresas` (
  `id_detalle_empresa` int NOT NULL AUTO_INCREMENT,
  `direccion_sede_empresa` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_detalle_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=267 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_empresas`
--

LOCK TABLES `detalle_empresas` WRITE;
/*!40000 ALTER TABLE `detalle_empresas` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_fichas_aprendices`
--

DROP TABLE IF EXISTS `detalle_fichas_aprendices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_fichas_aprendices` (
  `id_detalle_ficha_aprendiz` int NOT NULL AUTO_INCREMENT,
  `id_ficha` int NOT NULL,
  `id_aprendiz` int NOT NULL,
  PRIMARY KEY (`id_detalle_ficha_aprendiz`),
  UNIQUE KEY `id_detalle_ficha_aprendiz_UNIQUE` (`id_detalle_ficha_aprendiz`),
  KEY `id_ficha` (`id_ficha`),
  KEY `id_aprendiz` (`id_aprendiz`),
  CONSTRAINT `detalle_fichas_aprendices_ibfk_1` FOREIGN KEY (`id_ficha`) REFERENCES `fichas` (`id_ficha`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detalle_fichas_aprendices_ibfk_2` FOREIGN KEY (`id_aprendiz`) REFERENCES `aprendices` (`id_aprendiz`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=550 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_fichas_aprendices`
--

LOCK TABLES `detalle_fichas_aprendices` WRITE;
/*!40000 ALTER TABLE `detalle_fichas_aprendices` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_fichas_aprendices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalles_inscripciones`
--

DROP TABLE IF EXISTS `detalles_inscripciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalles_inscripciones` (
  `id_detalle_inscripcion` int NOT NULL AUTO_INCREMENT,
  `responsable_aval` varchar(100) DEFAULT NULL,
  `estado_aval` varchar(100) NOT NULL,
  `observaciones` varchar(500) DEFAULT NULL,
  `id_inscripcion` int NOT NULL,
  `rol_responsable` int NOT NULL,
  `descripcion_detalle` varchar(100) NOT NULL,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_detalle_inscripcion`),
  KEY `id_inscripcion` (`id_inscripcion`),
  KEY `fk_detalles_inscripciones_2_idx` (`rol_responsable`),
  CONSTRAINT `detalles_inscripciones_ibfk_1` FOREIGN KEY (`id_inscripcion`) REFERENCES `inscripciones` (`id_inscripcion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_detalles_inscripciones_2` FOREIGN KEY (`rol_responsable`) REFERENCES `roles` (`id_rol`) ON UPDATE CASCADE,
  CONSTRAINT `fk_rol_responsable_aval` FOREIGN KEY (`rol_responsable`) REFERENCES `usuarios` (`id_usuario`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_inscripciones`
--

LOCK TABLES `detalles_inscripciones` WRITE;
/*!40000 ALTER TABLE `detalles_inscripciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalles_inscripciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `actualizar_timestamp` BEFORE UPDATE ON `detalles_inscripciones` FOR EACH ROW BEGIN
    SET NEW.fecha_modificacion = CURRENT_TIMESTAMP;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `detalles_inscripciones_AFTER_UPDATE_1` AFTER UPDATE ON `detalles_inscripciones` FOR EACH ROW BEGIN
  IF NEW.estado_aval = 'Rechazado' THEN
    -- Actualizar el estado de "inscripciones" a "Rechazado"
    UPDATE inscripciones
    SET estado_general_inscripcion = 'Rechazado'
    WHERE id_inscripcion = NEW.id_inscripcion;
  -- Verificar si el nuevo estado es "Pendiente"
  ELSEIF NEW.estado_aval = 'Pendiente' THEN
    -- Verificar si hay algún detalle_inscripcion con estado diferente de "Pendiente"
    IF NOT EXISTS (
        SELECT 1
        FROM detalles_inscripciones
        WHERE id_inscripcion = NEW.id_inscripcion AND estado_aval != 'Pendiente'
    ) THEN
      -- Si no hay otros detalles_inscripciones con estado diferente de "Pendiente",
      -- entonces actualizamos el estado de "inscripciones" a "Pendiente"
      UPDATE inscripciones
      SET estado_general_inscripcion = 'Pendiente'
      WHERE id_inscripcion = NEW.id_inscripcion;
    END IF;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `aprobar_inscripcion` AFTER UPDATE ON `detalles_inscripciones` FOR EACH ROW BEGIN
    # Aprendiz
    DECLARE total_aprobados INT;
    DECLARE var_nombre_aprendiz VARCHAR(100);
    DECLARE var_apellido_aprendiz VARCHAR(100);
    DECLARE var_tipo_documento_aprendiz VARCHAR(50);
    DECLARE var_numero_documento_aprendiz VARCHAR(100);
    DECLARE var_email_aprendiz VARCHAR(500);
    DECLARE var_celular_aprendiz VARCHAR(100);
    DECLARE var_fecha_fin_practica_aprendiz DATE;
    DECLARE var_estado_aprendiz VARCHAR(300);
    DECLARE var_arl_paga VARCHAR(100);
    DECLARE var_modalidad_inscripcion INT;
    DECLARE id_arl INT;
	DECLARE fecha_fin_lectiva_inscripcion_sum DATE;
    
    # Empresa
    DECLARE var_nit_empresa VARCHAR(300);
    DECLARE var_nombre_empresa VARCHAR(300);
    DECLARE var_direccion_empresa VARCHAR(300);
    
    # Jefe
    DECLARE var_nombre_jefe_empresa_inscripcion VARCHAR(200);
    DECLARE var_cargo_jefe_empresa_inscripcion VARCHAR(200);
    DECLARE var_telefono_jefe_empresa_inscripcion VARCHAR(200);
    DECLARE var_email_jefe_empresa_inscripcion VARCHAR(200);
    DECLARE id_jefe_insertado INT;
    
    # Ficha
    DECLARE var_numero_ficha_inscripcion VARCHAR(200);
    DECLARE var_nombre_programa_inscripcion VARCHAR(200);
    DECLARE var_nivel_formacion_inscripcion VARCHAR(200);
    DECLARE var_nivel_formacion_inscripcion_int INT;
    DECLARE var_id_ficha_creada INT;
    DECLARE var_id_estudiante_registrado INT;
    
	SET @check_approve = NEW.estado_aval;
    
    IF @check_approve IS NOT NULL THEN
		-- Verificar si todos los detalles_inscripciones relacionados al id_inscripcion están en "Aprobado"
		SELECT 
			COUNT(*)
		INTO total_aprobados FROM
			detalles_inscripciones
		WHERE
			id_inscripcion = NEW.id_inscripcion
				AND estado_aval = 'Aprobado';

		IF total_aprobados = 4 THEN
			-- Cambiar el estado_general_inscripcion a "Aprobado" en la tabla inscripciones
			UPDATE inscripciones SET estado_general_inscripcion = 'Aprobado' WHERE id_inscripcion = NEW.id_inscripcion;

			-- Obtener los datos necesarios para crear el nuevo aprendiz (aprendiz)
	SELECT 
    LOWER(nombre_inscripcion) AS nombre_inscripcion,
    LOWER(apellido_inscripcion) AS apellido_inscripcion,
    LOWER(tipo_documento_inscripcion) AS tipo_documento_inscripcion,
    LOWER(documento_inscripcion) AS documento_inscripcion,
    LOWER(email_inscripcion) AS email_inscripcion,
    LOWER(inscripcion_celular) AS celular_inscripcion,
    LOWER(arl) AS arl,
    LOWER(modalidad_inscripcion) AS modalidad_inscripcion,
    fecha_fin_lectiva_inscripcion,
    numero_ficha_inscripcion,
    LOWER(nombre_programa_inscripcion) AS nombre_programa_inscripcion,
    LOWER(nivel_formacion_inscripcion) AS nivel_formacion_inscripcion
		INTO 
		var_nombre_aprendiz,
		var_apellido_aprendiz,
		var_tipo_documento_aprendiz,
		var_numero_documento_aprendiz,
		var_email_aprendiz,
		var_celular_aprendiz,
		var_arl_paga,
		var_modalidad_inscripcion,
		fecha_fin_lectiva_inscripcion_sum,
		var_numero_ficha_inscripcion,
		var_nombre_programa_inscripcion,
		var_nivel_formacion_inscripcion
		FROM
			inscripciones
	WHERE
		id_inscripcion = NEW.id_inscripcion;
		
		-- Obtener datos de la empresa
		SELECT LOWER(nit_empresa_inscripcion), LOWER(nombre_empresa_inscripcion), LOWER(direccion_empresa_inscripcion) INTO var_nit_empresa, var_nombre_empresa, var_direccion_empresa FROM inscripciones WHERE id_inscripcion = NEW.id_inscripcion;
		IF var_nit_empresa IS NOT NULL THEN
			SELECT direccion_sede_empresa INTO @check_direccion FROM detalle_empresas WHERE direccion_sede_empresa = var_direccion_empresa;
			# Agregar datos a la tabla empresas
			IF @check_direccion IS NULL THEN
				INSERT INTO detalle_empresas (direccion_sede_empresa) VALUES (var_direccion_empresa);
				SET @id_detalle_empresa_insertada = LAST_INSERT_ID();
      ELSE
        SELECT id_detalle_empresa INTO @id_detalle_empresa_insertada FROM detalle_empresas WHERE direccion_sede_empresa = var_direccion_empresa LIMIT 1;
			END IF;
			
			SELECT nit_empresa INTO @check_nit FROM empresas WHERE nit_empresa = var_nit_empresa;
			IF @check_nit IS NULL THEN
				INSERT INTO empresas (nit_empresa, nombre_empresa, id_detalle_empresa)
				VALUES (var_nit_empresa, var_nombre_empresa, @id_detalle_empresa_insertada);
				SET @id_empresa_insertada = LAST_INSERT_ID();
			ELSE
				SELECT id_empresa INTO @id_empresa_existente FROM empresas WHERE nit_empresa = @check_nit;
				SET @id_empresa_insertada = @id_empresa_existente;
			END IF;
		END IF;
		
			# Tomar datos del jefe
		SELECT LOWER(nombre_jefe_empresa_inscripcion), LOWER(cargo_jefe_empresa_inscripcion), LOWER(telefono_jefe_empresa_inscripcion), LOWER(email_jefe_empresa_inscripcion) INTO var_nombre_jefe_empresa_inscripcion, var_cargo_jefe_empresa_inscripcion, var_telefono_jefe_empresa_inscripcion, var_email_jefe_empresa_inscripcion FROM inscripciones WHERE id_inscripcion = NEW.id_inscripcion;
    SELECT COUNT(*) INTO @check_jefe FROM jefes where nombre_jefe LIKE var_nombre_jefe_empresa_inscripcion;
		IF @check_jefe = 0 THEN
			INSERT INTO jefes (nombre_jefe, cargo_jefe, numero_contacto_jefe, email_jefe) VALUES (IFNULL(var_nombre_jefe_empresa_inscripcion, null), IFNULL(var_cargo_jefe_empresa_inscripcion, null), IFNULL(var_telefono_jefe_empresa_inscripcion, null), IFNULL(var_email_jefe_empresa_inscripcion, null));
			SET id_jefe_insertado = LAST_INSERT_ID();
    ELSE
      SELECT id_jefe INTO id_jefe_insertado FROM jefes where nombre_jefe LIKE var_nombre_jefe_empresa_inscripcion LIMIT 1;
		END IF;

		-- Calcular la fecha de fin de práctica sumando 6 meses a la fecha_fin_lectiva_inscripcion
		IF fecha_fin_lectiva_inscripcion_sum IS NOT NULL THEN
			SET var_fecha_fin_practica_aprendiz = DATE_ADD(fecha_fin_lectiva_inscripcion_sum, INTERVAL 6 MONTH);
		END IF;
		
		-- Obtener el nivel de formación
		SELECT id_nivel_formacion INTO var_nivel_formacion_inscripcion_int FROM niveles_formacion WHERE nivel_formacion = var_nivel_formacion_inscripcion;
		-- Crear la ficha si no existe
		SELECT COUNT(*) INTO var_id_ficha_creada FROM fichas WHERE numero_ficha = var_numero_ficha_inscripcion;
		IF var_id_ficha_creada = 0 THEN
			INSERT INTO fichas (numero_ficha, nombre_programa_formacion, id_nivel_formacion) VALUES (var_numero_ficha_inscripcion, var_nombre_programa_inscripcion, var_nivel_formacion_inscripcion_int);
			SET var_id_ficha_creada = LAST_INSERT_ID();
    ELSE
      SELECT id_ficha INTO var_id_ficha_creada FROM fichas WHERE numero_ficha = var_numero_ficha_inscripcion;
		END IF;
			
			-- Determinar quien paga ARL
			IF var_arl_paga is null then
				set id_arl = 3;
			ELSEIF var_arl_paga = 'La empresa' THEN
				set id_arl = 2;
			ELSE
				set id_arl = 1;
			END IF;

			-- Determinar el estado del aprendiz
			IF CURDATE() BETWEEN fecha_fin_lectiva_inscripcion_sum AND var_fecha_fin_practica_aprendiz THEN
				SET var_estado_aprendiz = 'Practicas';
			ELSEIF CURDATE() < fecha_fin_lectiva_inscripcion_sum THEN
				SET var_estado_aprendiz = 'Lectiva';
			ELSE
				SET var_estado_aprendiz = 'Terminado';
			END IF;

			-- Insertar el nuevo aprendiz en la tabla 'aprendices'
      SELECT COUNT(*) INTO @check_aprendiz_exist FROM aprendices where numero_documento_aprendiz = var_numero_documento_aprendiz;
      IF @check_aprendiz_exist = 0 THEN
        INSERT INTO aprendices (nombre_aprendiz, apellido_aprendiz, tipo_documento_aprendiz, numero_documento_aprendiz, email_aprendiz, celular_aprendiz, fecha_fin_practica_aprendiz, estado_aprendiz, id_empresa, id_modalidad, id_jefe, id_arl)
        VALUES (var_nombre_aprendiz, var_apellido_aprendiz, var_tipo_documento_aprendiz, var_numero_documento_aprendiz, var_email_aprendiz, var_celular_aprendiz, var_fecha_fin_practica_aprendiz, var_estado_aprendiz, @id_empresa_insertada, var_modalidad_inscripcion, id_jefe_insertado, id_arl);
        SET var_id_estudiante_registrado = LAST_INSERT_ID();
        SELECT COUNT(*) INTO @check_ficha_relacion FROM detalle_fichas_aprendices where id_ficha =var_id_ficha_creada AND id_aprendiz = var_id_estudiante_registrado;
        IF @check_ficha_relacion = 0 THEN
          INSERT INTO detalle_fichas_aprendices(id_ficha, id_aprendiz) VALUES (var_id_ficha_creada, var_id_estudiante_registrado);
        END IF;
      ELSE
          SELECT id_aprendiz INTO @s_id_aprendiz FROM aprendices where numero_documento_aprendiz = var_numero_documento_aprendiz; 
          UPDATE aprendices SET nombre_aprendiz = IFNULL(var_nombre_aprendiz, nombre_aprendiz), apellido_aprendiz = IFNULL(var_apellido_aprendiz, apellido_aprendiz), tipo_documento_aprendiz = IFNULL(var_tipo_documento_aprendiz, tipo_documento_aprendiz), numero_documento_aprendiz = IFNULL(var_numero_documento_aprendiz, numero_documento_aprendiz), email_aprendiz = IFNULL(var_email_aprendiz, email_aprendiz), celular_aprendiz = IFNULL(var_celular_aprendiz, celular_aprendiz), fecha_fin_practica_aprendiz = IFNULL(var_fecha_fin_practica_aprendiz, fecha_fin_practica_aprendiz), estado_aprendiz = IFNULL(var_estado_aprendiz, estado_aprendiz), id_empresa = IFNULL(@id_empresa_insertada, id_empresa), id_modalidad = IFNULL(var_modalidad_inscripcion, id_modalidad), id_jefe = IFNULL(id_jefe_insertado, id_jefe), id_arl = IFNULL(id_arl, id_arl) WHERE id_aprendiz = @s_id_aprendiz;
      END IF;
		END IF;
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresas` (
  `id_empresa` int NOT NULL AUTO_INCREMENT,
  `nombre_empresa` varchar(500) NOT NULL,
  `nit_empresa` varchar(200) NOT NULL,
  `id_detalle_empresa` int NOT NULL,
  PRIMARY KEY (`id_empresa`),
  KEY `id_detalle_empresa` (`id_detalle_empresa`),
  CONSTRAINT `empresas_ibfk_1` FOREIGN KEY (`id_detalle_empresa`) REFERENCES `detalle_empresas` (`id_detalle_empresa`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=262 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fichas`
--

DROP TABLE IF EXISTS `fichas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fichas` (
  `id_ficha` int NOT NULL AUTO_INCREMENT,
  `numero_ficha` varchar(20) NOT NULL,
  `nombre_programa_formacion` varchar(500) NOT NULL,
  `fecha_inicio_lectiva` date DEFAULT NULL,
  `fecha_inicio_practica` date DEFAULT NULL,
  `id_instructor_seguimiento` int DEFAULT NULL,
  `id_instructor_lider` int DEFAULT NULL,
  `id_nivel_formacion` int DEFAULT NULL,
  `id_codigo_centro` int DEFAULT NULL,
  PRIMARY KEY (`id_ficha`),
  KEY `fk_fichas_1` (`id_instructor_seguimiento`),
  KEY `id_nivel_formacion` (`id_nivel_formacion`),
  KEY `fk_fichas_2` (`id_instructor_lider`) /*!80000 INVISIBLE */,
  KEY `fk_codigo_centro_idx` (`id_codigo_centro`),
  CONSTRAINT `fichas_ibfk_1` FOREIGN KEY (`id_nivel_formacion`) REFERENCES `niveles_formacion` (`id_nivel_formacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_codigo_centro` FOREIGN KEY (`id_codigo_centro`) REFERENCES `codigos_centros` (`id_codigo_centro`) ON UPDATE CASCADE,
  CONSTRAINT `fk_fichas_1` FOREIGN KEY (`id_instructor_seguimiento`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `fk_fichas_2` FOREIGN KEY (`id_instructor_lider`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichas`
--

LOCK TABLES `fichas` WRITE;
/*!40000 ALTER TABLE `fichas` DISABLE KEYS */;
/*!40000 ALTER TABLE `fichas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscripciones`
--

DROP TABLE IF EXISTS `inscripciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripciones` (
  `id_inscripcion` int NOT NULL AUTO_INCREMENT,
  `nombre_inscripcion` varchar(300) DEFAULT NULL,
  `apellido_inscripcion` varchar(300) DEFAULT NULL,
  `tipo_documento_inscripcion` varchar(100) DEFAULT NULL,
  `documento_inscripcion` varchar(100) DEFAULT NULL,
  `email_inscripcion` varchar(300) DEFAULT NULL,
  `inscripcion_celular` varchar(20) DEFAULT NULL,
  `etapa_actual_inscripcion` varchar(100) DEFAULT NULL,
  `modalidad_inscripcion` varchar(300) DEFAULT NULL,
  `nombre_programa_inscripcion` varchar(300) DEFAULT NULL,
  `nivel_formacion_inscripcion` varchar(100) DEFAULT NULL,
  `numero_ficha_inscripcion` varchar(20) DEFAULT NULL,
  `fecha_fin_lectiva_inscripcion` date DEFAULT NULL,
  `nombre_instructor_lider_inscripcion` varchar(200) DEFAULT NULL,
  `email_instructor_lider_inscripcion` varchar(200) DEFAULT NULL,
  `apoyo_sostenimiento_inscripcion` varchar(500) DEFAULT NULL,
  `nit_empresa_inscripcion` varchar(200) DEFAULT NULL,
  `nombre_empresa_inscripcion` varchar(500) DEFAULT NULL,
  `direccion_empresa_inscripcion` varchar(300) DEFAULT NULL,
  `municipio_empresa` varchar(100) DEFAULT NULL,
  `nombre_jefe_empresa_inscripcion` varchar(300) DEFAULT NULL,
  `cargo_jefe_empresa_inscripcion` varchar(300) DEFAULT NULL,
  `telefono_jefe_empresa_inscripcion` varchar(300) DEFAULT NULL,
  `email_jefe_empresa_inscripcion` varchar(300) DEFAULT NULL,
  `arl` varchar(1000) DEFAULT NULL,
  `link_documentos` varchar(1000) DEFAULT NULL,
  `observaciones` varchar(2500) DEFAULT NULL,
  `estado_general_inscripcion` varchar(60) NOT NULL DEFAULT 'Pendiente',
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `responsable_inscripcion` varchar(100) NOT NULL,
  PRIMARY KEY (`id_inscripcion`)
) ENGINE=InnoDB AUTO_INCREMENT=237 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripciones`
--

LOCK TABLES `inscripciones` WRITE;
/*!40000 ALTER TABLE `inscripciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `inscripciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `inscripcion_trigger` AFTER INSERT ON `inscripciones` FOR EACH ROW BEGIN
  DECLARE instructor_seguimiento_id INT;
  DECLARE instructor_lider_practicas_id INT;
  DECLARE coordinador_id INT;
  DECLARE rol_instructor_lider_practicas INT;
  DECLARE rol_coordinador INT;
  DECLARE rol_instructor_seguimiento INT;
  
  -- Obtener rol coordinador
  SELECT id_rol INTO rol_coordinador
  FROM roles
  WHERE nombre_rol = 'Coordinador' LIMIT 1;
  
  -- Obtener rol instructor de seguimiento
  SELECT id_rol INTO rol_instructor_seguimiento
  FROM roles
  WHERE nombre_rol = 'Instructor de Seguimiento' LIMIT 1;
  
  -- Obtener rol instructor líder de prácticas
  SELECT id_rol INTO rol_instructor_lider_practicas
  FROM roles
  WHERE nombre_rol = 'Instructor líder de prácticas' LIMIT 1;

  -- Obtener el ID del instructor de seguimiento basado en el número de ficha
  SELECT id_instructor_seguimiento INTO instructor_seguimiento_id
  FROM fichas
  WHERE numero_ficha = NEW.numero_ficha_inscripcion LIMIT 1;
  
  -- Obtener el ID del instructor líder de prácticas basado en el id de usuario
  SELECT id_usuario INTO instructor_lider_practicas_id
  FROM usuarios
  WHERE id_rol = 1 LIMIT 1;
  
  -- Obtener el ID del usuario con rol coordinador acádemico
  SELECT id_usuario INTO coordinador_id
  FROM usuarios
  WHERE numero_documento_usuario = '1234567098' LIMIT 1;
  
  -- Insertar los tres registros en detalles_inscripciones
  INSERT INTO detalles_inscripciones (responsable_aval, estado_aval, id_inscripcion, rol_responsable, descripcion_detalle)
  VALUES (instructor_lider_practicas_id, 'Pendiente', NEW.id_inscripcion, rol_instructor_lider_practicas, 'Documento completo'),
  (instructor_lider_practicas_id, 'Pendiente', NEW.id_inscripcion, rol_instructor_lider_practicas, 'RAPS aprobados'),
  (null, 'Pendiente', NEW.id_inscripcion, rol_instructor_seguimiento, 'Funciones'),
  (null, 'Pendiente', NEW.id_inscripcion, rol_coordinador, 'Aval');
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `jefes`
--

DROP TABLE IF EXISTS `jefes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jefes` (
  `id_jefe` int NOT NULL AUTO_INCREMENT,
  `nombre_jefe` varchar(200) DEFAULT NULL,
  `cargo_jefe` varchar(300) DEFAULT NULL,
  `numero_contacto_jefe` varchar(100) DEFAULT NULL,
  `email_jefe` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id_jefe`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jefes`
--

LOCK TABLES `jefes` WRITE;
/*!40000 ALTER TABLE `jefes` DISABLE KEYS */;
/*!40000 ALTER TABLE `jefes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localidades`
--

DROP TABLE IF EXISTS `localidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localidades` (
  `id_localidad` int NOT NULL AUTO_INCREMENT,
  `nombre_localidad` varchar(300) NOT NULL,
  `region` varchar(300) NOT NULL,
  PRIMARY KEY (`id_localidad`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localidades`
--

LOCK TABLES `localidades` WRITE;
/*!40000 ALTER TABLE `localidades` DISABLE KEYS */;
INSERT INTO `localidades` VALUES (1,'Medellin','Colombia');
/*!40000 ALTER TABLE `localidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modalidades`
--

DROP TABLE IF EXISTS `modalidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modalidades` (
  `id_modalidad` int NOT NULL AUTO_INCREMENT,
  `nombre_modalidad` varchar(500) NOT NULL,
  `numero_horas_minimas` int NOT NULL,
  `numero_horas_maximas` int NOT NULL,
  PRIMARY KEY (`id_modalidad`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modalidades`
--

LOCK TABLES `modalidades` WRITE;
/*!40000 ALTER TABLE `modalidades` DISABLE KEYS */;
INSERT INTO `modalidades` VALUES (1,'Pasantías',100,300),(2,'Contrato de aprendizaje',200,800),(3,'Proyecto Productivo',100,100),(4,'Monitoría',100,100),(5,'Vinculación laboral',100,100);
/*!40000 ALTER TABLE `modalidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `niveles_formacion`
--

DROP TABLE IF EXISTS `niveles_formacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `niveles_formacion` (
  `id_nivel_formacion` int NOT NULL AUTO_INCREMENT,
  `nivel_formacion` varchar(300) NOT NULL,
  PRIMARY KEY (`id_nivel_formacion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `niveles_formacion`
--

LOCK TABLES `niveles_formacion` WRITE;
/*!40000 ALTER TABLE `niveles_formacion` DISABLE KEYS */;
INSERT INTO `niveles_formacion` VALUES (1,'Técnico'),(2,'Tecnología'),(3,'Auxiliar');
/*!40000 ALTER TABLE `niveles_formacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(100) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Instructor líder de prácticas'),(2,'Coordinador'),(3,'Instructor de Seguimiento'),(4,'Instructor Líder'),(5,'Instructor Sin Rol');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombres_usuario` varchar(100) NOT NULL,
  `apellidos_usuario` varchar(100) NOT NULL,
  `tipo_documento_usuario` varchar(100) NOT NULL,
  `numero_documento_usuario` varchar(100) NOT NULL,
  `email_usuario` varchar(300) NOT NULL,
  `numero_celular_usuario` varchar(20) NOT NULL,
  `contrasena_usuario` varchar(500) NOT NULL,
  `id_rol` int NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Admin','Admin','CC','1234567890','juanito@gmail.com','3195810996','$2b$10$G/qBWAkBBWWYv168liiN4.yNHoflbKb9y6nUEFZvtVomsVCNQhmo6',1),(2,'Stiven','Blandón','CC','1017924888','blandon0207s@gmail.com','3183577499','$2b$10$GWUNM.FJKmU81l5dW0pDBOuc5EGYTeYjJxa9ENNNaioKoWM3QR.aq',2),(3,'Adelaida','Benavidez','CC','1017923453','adelaida@misena.edu.co','3183575433','$2b$10$wskcGpv.zlFyAp1gWLZSpunAe5uqGcgJ2yAhpzOQyRWdlpp./jUkG',4),(30,'Luis Miguel','Alvarez','CC','1001470143','luismiguelalvarezmarin109@gmail.com','3043953888','$2b$10$NHxfsKtt8cJCoWi/VgO/m.nTbTBT1zotRApg775vXixvH15.gr59W',1),(31,'Maribel ','Marin','CC','43289261','maribelmarin300@gmail.com','087962039','$2b$10$fI3gp0WpTbGUqP/K.qbdaOh2V01qX.y96yZ6/iB9ZF4bkyZwTTUxO',3),(32,'COORDINADOR','LUCHO','CC','1001470144','luismidev09@gmail.com','092794295','$2b$10$jS9t0dxRkL1CD4kzmu9feOfIoyWZDPRpQEuQIspR2DgsgwjGDqL6C',2);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sena_practicas2'
--

--
-- Dumping routines for database 'sena_practicas2'
--
/*!50003 DROP PROCEDURE IF EXISTS `actualizar_fecha_ficha` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_fecha_ficha`(IN p_numero_ficha varchar(50), IN p_fecha_inicio_lectiva date, IN p_fecha_inicio_practica date)
BEGIN
declare variable_id_ficha int;
    select id_ficha into variable_id_ficha from fichas where numero_ficha = p_numero_ficha;
    
    UPDATE fichas SET fecha_inicio_lectiva = IFNULL(p_fecha_inicio_lectiva, fecha_inicio_lectiva), fecha_inicio_practica = IFNULL(p_fecha_inicio_practica, fecha_inicio_practica) WHERE id_ficha = variable_id_ficha;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `alerta_bisemanal` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `alerta_bisemanal`()
BEGIN
    SELECT
    aprendices.nombre_aprendiz,
    aprendices.apellido_aprendiz,
    aprendices.tipo_documento_aprendiz,
    aprendices.numero_documento_aprendiz,
    aprendices.email_aprendiz,
    aprendices.celular_aprendiz,
    aprendices.fecha_fin_practica_aprendiz,
    aprendices.estado_aprendiz,
    fichas.numero_ficha,
    fichas.nombre_programa_formacion,
    fichas.fecha_inicio_lectiva,
    fichas.fecha_inicio_practica,
    modalidades.nombre_modalidad,
    empresas.nombre_empresa,
    empresas.nit_empresa,
    detalle_empresas.direccion_sede_empresa,
    jefes.nombre_jefe,
    jefes.cargo_jefe,
    jefes.numero_contacto_jefe,
    jefes.email_jefe,
    arl.nombre_arl
FROM
    aprendices
        LEFT JOIN
    detalle_fichas_aprendices ON detalle_fichas_aprendices.id_aprendiz = aprendices.id_aprendiz
        LEFT JOIN
    fichas ON fichas.id_ficha = detalle_fichas_aprendices.id_ficha
        LEFT JOIN
    modalidades ON modalidades.id_modalidad = aprendices.id_modalidad
        LEFT JOIN
    empresas ON empresas.id_empresa = aprendices.id_empresa
        LEFT JOIN
    detalle_empresas ON detalle_empresas.id_detalle_empresa = empresas.id_detalle_empresa
        LEFT JOIN
    jefes ON jefes.id_jefe = aprendices.id_jefe
        LEFT JOIN
    arl ON arl.id_arl = aprendices.id_arl
WHERE
    (estado_aprendiz = 'lectiva' OR estado_aprendiz = 'en formacion')
  OR
  (fecha_fin_practica_aprendiz IS NOT NULL AND fecha_fin_practica_aprendiz < DATE_SUB(NOW(), INTERVAL 6 MONTH))
  AND
  estado_aprendiz NOT IN ('Terminado', 'Cancelado', 'Practicas');
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `aprendicesPorNumeroFicha` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `aprendicesPorNumeroFicha`(IN p_numeroFicha varchar(50))
BEGIN
	DECLARE id_ficha_buscada INT;
    SELECT id_ficha INTO id_ficha_buscada FROM fichas where numero_ficha LIKE p_numeroFicha;
SELECT 
    aprendices.nombre_aprendiz,
    aprendices.apellido_aprendiz,
    aprendices.tipo_documento_aprendiz,
    aprendices.numero_documento_aprendiz,
    aprendices.email_aprendiz,
    aprendices.celular_aprendiz,
    aprendices.fecha_fin_practica_aprendiz,
    aprendices.estado_aprendiz,
    fichas.numero_ficha,
    fichas.nombre_programa_formacion,
    fichas.fecha_inicio_lectiva,
    fichas.fecha_inicio_practica,
    modalidades.nombre_modalidad,
    empresas.nombre_empresa,
    empresas.nit_empresa,
    detalle_empresas.direccion_sede_empresa,
    jefes.nombre_jefe,
    jefes.cargo_jefe,
    jefes.numero_contacto_jefe,
    jefes.email_jefe,
    arl.nombre_arl,
    (CONCAT((SELECT 
                    COUNT(*)
                FROM
                    aprendices_bitacoras
                        INNER JOIN
                    aprendices_bitacoras_detalles ON aprendices_bitacoras_detalles.id_bitacora = aprendices_bitacoras.id_bitacora
                WHERE
                    aprendices_bitacoras_detalles.id_aprendiz = aprendices.id_aprendiz
                        AND aprendices_bitacoras.calificacion_bitacora IS NOT NULL),
            '/',
            (SELECT 
                    COUNT(*)
                FROM
                    aprendices_bitacoras
                        INNER JOIN
                    aprendices_bitacoras_detalles ON aprendices_bitacoras_detalles.id_bitacora = aprendices_bitacoras.id_bitacora
                WHERE
                    aprendices_bitacoras_detalles.id_aprendiz = aprendices.id_aprendiz
                        AND aprendices_bitacoras.calificacion_bitacora IS NULL))) AS bitacoras_aprendiz,
    CASE
        WHEN
            DATEDIFF(@fecha_actual,
                    DATE_SUB(aprendices.fecha_fin_practica_aprendiz,
                        INTERVAL 6 MONTH)) <= 0
        THEN
            'N/A'
        WHEN
            DATEDIFF(@fecha_actual,
                    DATE_SUB(aprendices.fecha_fin_practica_aprendiz,
                        INTERVAL 6 MONTH)) <= 180
        THEN
            FLOOR(DATEDIFF(@fecha_actual,
                            DATE_SUB(aprendices.fecha_fin_practica_aprendiz,
                                INTERVAL 6 MONTH)) / 15)
        ELSE 'N/A'
    END AS bitacoras_esperadas
FROM
    aprendices
        LEFT JOIN
    detalle_fichas_aprendices ON detalle_fichas_aprendices.id_aprendiz = aprendices.id_aprendiz
        LEFT JOIN
    fichas ON fichas.id_ficha = detalle_fichas_aprendices.id_ficha
        LEFT JOIN
    modalidades ON modalidades.id_modalidad = aprendices.id_modalidad
        LEFT JOIN
    empresas ON empresas.id_empresa = aprendices.id_empresa
        LEFT JOIN
    detalle_empresas ON detalle_empresas.id_detalle_empresa = empresas.id_detalle_empresa
        LEFT JOIN
    jefes ON jefes.id_jefe = aprendices.id_jefe
        LEFT JOIN
    arl ON arl.id_arl = aprendices.id_arl
WHERE
    fichas.id_ficha = id_ficha_buscada;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `conseguir_aprendices_en_practica` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `conseguir_aprendices_en_practica`()
BEGIN
    SELECT aprendices.nombre_aprendiz,
    aprendices.apellido_aprendiz,
    aprendices.tipo_documento_aprendiz,
    aprendices.numero_documento_aprendiz,
    aprendices.email_aprendiz,
    aprendices.celular_aprendiz,
    aprendices.fecha_fin_practica_aprendiz,
    aprendices.estado_aprendiz,
    fichas.numero_ficha,
    fichas.nombre_programa_formacion,
    fichas.fecha_inicio_lectiva,
    fichas.fecha_inicio_practica,
    modalidades.nombre_modalidad,
    empresas.nombre_empresa,
    empresas.nit_empresa,
    detalle_empresas.direccion_sede_empresa,
    jefes.nombre_jefe,
    jefes.cargo_jefe,
    jefes.numero_contacto_jefe,
    jefes.email_jefe,
    arl.nombre_arl
FROM aprendices
    LEFT JOIN
    detalle_fichas_aprendices ON detalle_fichas_aprendices.id_aprendiz = aprendices.id_aprendiz
        LEFT JOIN
    fichas ON fichas.id_ficha = detalle_fichas_aprendices.id_ficha
        LEFT JOIN
    modalidades ON modalidades.id_modalidad = aprendices.id_modalidad
        LEFT JOIN
    empresas ON empresas.id_empresa = aprendices.id_empresa
        LEFT JOIN
    detalle_empresas ON detalle_empresas.id_detalle_empresa = empresas.id_detalle_empresa
        LEFT JOIN
    jefes ON jefes.id_jefe = aprendices.id_jefe
        LEFT JOIN
    arl ON arl.id_arl = aprendices.id_arl
WHERE (estado_aprendiz = 'Practicas' OR estado_aprendiz = 'contratado') 
      AND fecha_fin_practica_aprendiz >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      AND fecha_fin_practica_aprendiz >= NOW();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `conseguir_aprendices_por_etapa` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `conseguir_aprendices_por_etapa`(IN p_modalidad VARCHAR(500))
BEGIN
SELECT
    aprendices.nombre_aprendiz,
    aprendices.apellido_aprendiz,
    aprendices.tipo_documento_aprendiz,
    aprendices.numero_documento_aprendiz,
    aprendices.email_aprendiz,
    aprendices.celular_aprendiz,
    DATE_SUB(fecha_fin_practica_aprendiz, INTERVAL 6 MONTH) as fecha_inicio_practica_aprendiz,
    aprendices.fecha_fin_practica_aprendiz,
    aprendices.estado_aprendiz,
    fichas.numero_ficha,
    fichas.nombre_programa_formacion,
    fichas.fecha_inicio_lectiva,
    fichas.fecha_inicio_practica,
    modalidades.nombre_modalidad,
    empresas.nombre_empresa,
    empresas.nit_empresa,
    detalle_empresas.direccion_sede_empresa,
    jefes.nombre_jefe,
    jefes.cargo_jefe,
    jefes.numero_contacto_jefe,
    jefes.email_jefe,
    arl.nombre_arl
FROM
    aprendices
        LEFT JOIN
    detalle_fichas_aprendices ON detalle_fichas_aprendices.id_aprendiz = aprendices.id_aprendiz
        LEFT JOIN
    fichas ON fichas.id_ficha = detalle_fichas_aprendices.id_ficha
        LEFT JOIN
    modalidades ON modalidades.id_modalidad = aprendices.id_modalidad
        LEFT JOIN
    empresas ON empresas.id_empresa = aprendices.id_empresa
        LEFT JOIN
    detalle_empresas ON detalle_empresas.id_detalle_empresa = empresas.id_detalle_empresa
        LEFT JOIN
    jefes ON jefes.id_jefe = aprendices.id_jefe
        LEFT JOIN
    arl ON arl.id_arl = aprendices.id_arl
		WHERE
	modalidades.nombre_modalidad LIKE p_modalidad;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `conseguir_aprendices_por_instructor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `conseguir_aprendices_por_instructor`(IN p_nombre_completo VARCHAR(100))
BEGIN
    SELECT id_usuario
    INTO @id_instructor
    FROM usuarios
    WHERE CONCAT(nombres_usuario, ' ', apellidos_usuario) LIKE CONCAT('%', p_nombre_completo, '%') AND id_rol = 3;
    
    SET @fecha_actual = CURDATE();
    
SELECT 
    aprendices.nombre_aprendiz,
    aprendices.apellido_aprendiz,
    aprendices.tipo_documento_aprendiz,
    aprendices.numero_documento_aprendiz,
    aprendices.email_aprendiz,
    aprendices.celular_aprendiz,
    aprendices.fecha_fin_practica_aprendiz,
    aprendices.estado_aprendiz,
    fichas.numero_ficha,
    fichas.nombre_programa_formacion,
    fichas.fecha_inicio_lectiva,
    fichas.fecha_inicio_practica,
    modalidades.nombre_modalidad,
    empresas.nombre_empresa,
    empresas.nit_empresa,
    detalle_empresas.direccion_sede_empresa,
    jefes.nombre_jefe,
    jefes.cargo_jefe,
    jefes.numero_contacto_jefe,
    jefes.email_jefe,
    arl.nombre_arl,
    (CONCAT((SELECT 
                    COUNT(*)
                FROM
                    aprendices_bitacoras
                        INNER JOIN
                    aprendices_bitacoras_detalles ON aprendices_bitacoras_detalles.id_bitacora = aprendices_bitacoras.id_bitacora
                WHERE
                    aprendices_bitacoras_detalles.id_aprendiz = aprendices.id_aprendiz
                        AND aprendices_bitacoras.calificacion_bitacora IS NOT NULL),
            '/',
            (SELECT 
                    COUNT(*)
                FROM
                    aprendices_bitacoras
                        INNER JOIN
                    aprendices_bitacoras_detalles ON aprendices_bitacoras_detalles.id_bitacora = aprendices_bitacoras.id_bitacora
                WHERE
                    aprendices_bitacoras_detalles.id_aprendiz = aprendices.id_aprendiz
                        AND aprendices_bitacoras.calificacion_bitacora IS NULL))) AS bitacoras_aprendiz,
    CASE
        WHEN
            DATEDIFF(@fecha_actual,
                    DATE_SUB(aprendices.fecha_fin_practica_aprendiz,
                        INTERVAL 6 MONTH)) <= 0
        THEN
            'N/A'
        WHEN
            DATEDIFF(@fecha_actual,
                    DATE_SUB(aprendices.fecha_fin_practica_aprendiz,
                        INTERVAL 6 MONTH)) <= 180
        THEN
            FLOOR(DATEDIFF(@fecha_actual,
                            DATE_SUB(aprendices.fecha_fin_practica_aprendiz,
                                INTERVAL 6 MONTH)) / 15)
        ELSE 'N/A'
    END AS bitacoras_esperadas
FROM
    aprendices
        LEFT JOIN
    detalle_fichas_aprendices ON detalle_fichas_aprendices.id_aprendiz = aprendices.id_aprendiz
        LEFT JOIN
    fichas ON fichas.id_ficha = detalle_fichas_aprendices.id_ficha
        LEFT JOIN
    modalidades ON modalidades.id_modalidad = aprendices.id_modalidad
        LEFT JOIN
    empresas ON empresas.id_empresa = aprendices.id_empresa
        LEFT JOIN
    detalle_empresas ON detalle_empresas.id_detalle_empresa = empresas.id_detalle_empresa
        LEFT JOIN
    jefes ON jefes.id_jefe = aprendices.id_jefe
        LEFT JOIN
    arl ON arl.id_arl = aprendices.id_arl
WHERE
    fichas.id_instructor_seguimiento = @id_instructor;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `conseguir_aprendices_por_modalidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `conseguir_aprendices_por_modalidad`(IN p_modalidad VARCHAR(500))
BEGIN
SELECT
    aprendices.nombre_aprendiz,
    aprendices.apellido_aprendiz,
    aprendices.tipo_documento_aprendiz,
    aprendices.numero_documento_aprendiz,
    aprendices.email_aprendiz,
    aprendices.celular_aprendiz,
    DATE_SUB(fecha_fin_practica_aprendiz, INTERVAL 6 MONTH) as fecha_inicio_practica_aprendiz,
    aprendices.fecha_fin_practica_aprendiz,
    aprendices.estado_aprendiz,
    fichas.numero_ficha,
    fichas.nombre_programa_formacion,
    fichas.fecha_inicio_lectiva,
    fichas.fecha_inicio_practica,
    modalidades.nombre_modalidad,
    empresas.nombre_empresa,
    empresas.nit_empresa,
    detalle_empresas.direccion_sede_empresa,
    jefes.nombre_jefe,
    jefes.cargo_jefe,
    jefes.numero_contacto_jefe,
    jefes.email_jefe,
    arl.nombre_arl
FROM
    aprendices
        LEFT JOIN
    detalle_fichas_aprendices ON detalle_fichas_aprendices.id_aprendiz = aprendices.id_aprendiz
        LEFT JOIN
    fichas ON fichas.id_ficha = detalle_fichas_aprendices.id_ficha
        LEFT JOIN
    modalidades ON modalidades.id_modalidad = aprendices.id_modalidad
        LEFT JOIN
    empresas ON empresas.id_empresa = aprendices.id_empresa
        LEFT JOIN
    detalle_empresas ON detalle_empresas.id_detalle_empresa = empresas.id_detalle_empresa
        LEFT JOIN
    jefes ON jefes.id_jefe = aprendices.id_jefe
        LEFT JOIN
    arl ON arl.id_arl = aprendices.id_arl
        WHERE
    modalidades.nombre_modalidad LIKE p_modalidad;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `full_info_aprendiz` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `full_info_aprendiz`()
BEGIN
	SELECT 
    aprendices.nombre_aprendiz,
    aprendices.apellido_aprendiz,
    aprendices.tipo_documento_aprendiz,
    aprendices.numero_documento_aprendiz,
    aprendices.email_aprendiz,
    aprendices.celular_aprendiz,
    aprendices.fecha_fin_practica_aprendiz,
    aprendices.estado_aprendiz,
    fichas.numero_ficha,
    fichas.nombre_programa_formacion,
    fichas.fecha_inicio_lectiva,
    fichas.fecha_inicio_practica,
    modalidades.nombre_modalidad,
    empresas.nombre_empresa,
    empresas.nit_empresa,
    detalle_empresas.direccion_sede_empresa,
    jefes.nombre_jefe,
    jefes.cargo_jefe,
    jefes.numero_contacto_jefe,
    jefes.email_jefe,
    arl.nombre_arl
FROM
    aprendices
        LEFT JOIN
    detalle_fichas_aprendices ON detalle_fichas_aprendices.id_aprendiz = aprendices.id_aprendiz
        LEFT JOIN
    fichas ON fichas.id_ficha = detalle_fichas_aprendices.id_ficha
        LEFT JOIN
    modalidades ON modalidades.id_modalidad = aprendices.id_modalidad
        LEFT JOIN
    empresas ON empresas.id_empresa = aprendices.id_empresa
        LEFT JOIN
    detalle_empresas ON detalle_empresas.id_detalle_empresa = empresas.id_detalle_empresa
        LEFT JOIN
    jefes ON jefes.id_jefe = aprendices.id_jefe
        LEFT JOIN
    arl ON arl.id_arl = aprendices.id_arl;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `obtener_cantidad_fichas_por_instructor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_cantidad_fichas_por_instructor`(IN instructor_nombre VARCHAR(255))
BEGIN
    SELECT 
        CONCAT(u.nombres_usuario, ' ', u.apellidos_usuario) AS nombre_instructor,
        COUNT(f.id_ficha) AS cantidad_fichas
    FROM 
        usuarios u
    LEFT JOIN 
        fichas f ON u.id_usuario = f.id_instructor_seguimiento OR u.id_usuario = f.id_instructor_lider
    WHERE 
        CONCAT(u.nombres_usuario, ' ', u.apellidos_usuario) = instructor_nombre
    GROUP BY 
        u.id_usuario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `subir_aprendices_con_ficha` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `subir_aprendices_con_ficha`(IN p_tipo_documento_aprendiz VARCHAR(30), IN p_numero_documento_aprendiz VARCHAR(50), IN p_nombre_aprendiz VARCHAR(100), IN p_apellido_aprendiz VARCHAR(100), IN p_celular_aprendiz VARCHAR(50), IN p_email_aprendiz VARCHAR(500), IN p_estado_aprendiz VARCHAR(50), IN p_id_ficha INT)
BEGIN
    SELECT COUNT(*) INTO @check_aprendiz FROM aprendices WHERE numero_documento_aprendiz = p_numero_documento_aprendiz;
    IF @check_aprendiz = 0 THEN
        INSERT INTO aprendices(nombre_aprendiz, apellido_aprendiz, tipo_documento_aprendiz, numero_documento_aprendiz, email_aprendiz, celular_aprendiz, estado_aprendiz) VALUES (p_nombre_aprendiz, p_apellido_aprendiz, p_tipo_documento_aprendiz, p_numero_documento_aprendiz, p_email_aprendiz, p_celular_aprendiz, p_estado_aprendiz);
        SET @id_insertado = last_insert_id();
        INSERT INTO detalle_fichas_aprendices (id_ficha, id_aprendiz) VALUES(p_id_ficha, @id_insertado);
    ELSE 
        SELECT id_aprendiz INTO @id_aprendiz FROM aprendices WHERE numero_documento_aprendiz = p_numero_documento_aprendiz;
        SELECT COUNT(*) into @check_detalle FROM detalle_fichas_aprendices WHERE id = p_id_ficha AND id_aprendiz = @id_aprendiz;
        IF @check_detalle = 0 THEN
            INSERT INTO detalle_fichas_aprendices (id_ficha, id_aprendiz) VALUES(p_id_ficha, @id_aprendiz);
        END IF;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `subir_aprendiz_contrato_aprendizaje` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `subir_aprendiz_contrato_aprendizaje`(IN p_nombre_aprendiz VARCHAR(500), IN p_apellido_aprendiz VARCHAR(500), IN p_tipo_documento_aprendiz VARCHAR(500), IN p_numero_documento_aprendiz VARCHAR(500), IN p_fecha_fin_practica_aprendiz DATE, IN p_estado_aprendiz VARCHAR(500), IN p_id_empresa INT, IN p_id_modalidad INT, IN p_id_arl INT, IN p_id_contrato INT, IN p_id_ficha INT)
BEGIN
	SELECT COUNT(*) INTO @check_student FROM aprendices WHERE numero_documento_aprendiz = p_numero_documento_aprendiz;
    IF @check_student = 0 THEN
		INSERT INTO aprendices (nombre_aprendiz, apellido_aprendiz, tipo_documento_aprendiz, numero_documento_aprendiz, fecha_fin_practica_aprendiz, estado_aprendiz, id_empresa, id_modalidad, id_arl, id_contrato) VALUES (p_nombre_aprendiz, p_apellido_aprendiz, p_tipo_documento_aprendiz, p_numero_documento_aprendiz, p_fecha_fin_practica_aprendiz, p_estado_aprendiz, p_id_empresa, p_id_modalidad, p_id_arl, p_id_contrato);
        SET @id_aprendiz = last_insert_id();
        INSERT INTO detalle_fichas_aprendices (id_ficha, id_aprendiz) VALUES (p_id_ficha, @id_aprendiz);
	ELSE
		SELECT id_aprendiz into @id_aprendiz FROM aprendices WHERE numero_documento_aprendiz = p_numero_documento_aprendiz;
        INSERT INTO detalle_fichas_aprendices (id_ficha, id_aprendiz) VALUES (p_id_ficha, @id_aprendiz);
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `subir_contratos_inexistentes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `subir_contratos_inexistentes`(IN p_fecha_inicio DATE, IN p_fecha_fin DATE, IN p_estado_contrato VARCHAR(50), OUT p_id_contrato INT)
BEGIN
	SELECT COUNT(*) into @check_data FROM contratos_aprendizajes WHERE fecha_inicio_contrato = p_fecha_inicio AND fecha_fin_contrato = p_fecha_fin LIMIT 1;
    IF @check_data = 0 THEN
		INSERT INTO contratos_aprendizajes (fecha_inicio_contrato, fecha_fin_contrato, estado_contrato) VALUES (p_fecha_inicio, p_fecha_fin, p_estado_contrato);
		SET p_id_contrato = last_insert_id();
	ELSE
		SELECT id_contratos_aprendizaje into p_id_contrato FROM contratos_aprendizajes WHERE fecha_inicio_contrato = p_fecha_inicio AND fecha_fin_contrato = p_fecha_fin LIMIT 1;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `subir_empresas_inexistentes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `subir_empresas_inexistentes`(IN p_direccion_sede_empresa VARCHAR(100), IN p_nombre_empresa VARCHAR(100), IN p_nit_empresa VARCHAR(50), OUT p_id_empresa INT)
BEGIN
	SELECT COUNT(*) into @check_data FROM empresas WHERE nit_empresa = p_nit_empresa LIMIT 1;
	IF @check_data = 0 THEN
		INSERT INTO detalle_empresas (direccion_sede_empresa) VALUES (p_direccion_sede_empresa);
        SET @last_id = LAST_INSERT_ID();
        INSERT INTO empresas (nombre_empresa, nit_empresa, id_detalle_empresa) VALUES (p_nombre_empresa, p_nit_empresa, @last_id);
        SET p_id_empresa = LAST_INSERT_ID();
	ELSE
		SELECT id_empresa INTO p_id_empresa FROM empresas WHERE nit_empresa = p_nit_empresa LIMIT 1;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `subir_fichas_inexistentes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `subir_fichas_inexistentes`(IN p_numero_ficha VARCHAR(100), IN p_nombre_programa_formacion VARCHAR(100), IN p_fecha_inicio_lectiva DATE, IN p_fecha_inicio_practica DATE, IN p_id_nivel_formacion INT, IN p_codigo_centro VARCHAR(50), OUT p_id_ficha INT)
BEGIN
	DECLARE codigoInsertedID INT;
    SELECT COUNT(*) INTO @check_codigo FROM codigos_centros WHERE numero_codigo_centro = p_codigo_centro LIMIT 1;
    IF @check_codigo = 0 THEN
		INSERT INTO codigos_centros (numero_codigo_centro) VALUES (p_codigo_centro);
        SET codigoInsertedID = last_insert_id();
    ELSE
		SELECT id_codigo_centro INTO codigoInsertedID FROM codigos_centros WHERE numero_codigo_centro = p_codigo_centro;
    END IF;
    
	SELECT 
    COUNT(*)
INTO @check_data FROM
    fichas
WHERE
    numero_ficha = p_numero_ficha LIMIT 1;
    IF @check_data = 0 THEN
		INSERT INTO fichas (numero_ficha, nombre_programa_formacion, fecha_inicio_lectiva, fecha_inicio_practica, id_nivel_formacion, id_codigo_centro) VALUES (p_numero_ficha, p_nombre_programa_formacion, p_fecha_inicio_lectiva, p_fecha_inicio_practica, p_id_nivel_formacion, codigoInsertedID);
        SET p_id_ficha = last_insert_id();
	ELSE
		SELECT id_ficha into p_id_ficha FROM fichas WHERE numero_ficha = p_numero_ficha LIMIT 1;
        UPDATE fichas SET fecha_inicio_lectiva = p_fecha_inicio_lectiva, fecha_inicio_practica = p_fecha_inicio_practica, id_nivel_formacion = p_id_nivel_formacion, id_codigo_centro = codigoInsertedID WHERE id_ficha = p_id_ficha;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `subir_ficha_minima_info` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `subir_ficha_minima_info`(IN p_numero_ficha varchar(50), IN p_nombre_programa_formacion VARCHAR(100), OUT p_id_ficha INT)
BEGIN
	SELECT COUNT(*) INTO @check_ficha FROM fichas WHERE numero_ficha = p_numero_ficha;
    IF @check_ficha = 0 THEN
		INSERT INTO fichas (numero_ficha, nombre_programa_formacion) VALUES (p_numero_ficha, p_nombre_programa_formacion);
        SET p_id_ficha = last_insert_id();
    ELSE
		SELECT id_ficha INTO p_id_ficha FROM fichas WHERE numero_ficha = p_numero_ficha;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `subir_visita_con_detalles` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `subir_visita_con_detalles`(IN p_id_aprendiz int, IN p_estado_visita varchar(50), IN p_observaciones_visita varchar(200), IN p_usuario_responsable int )
BEGIN
	declare ultimo_numero_visita int;
    select count(*) into ultimo_numero_visita from aprendices_visitas inner join aprendices_visitas_detalles on aprendices_visitas_detalles.id_visita = aprendices_visitas.id_visita where id_aprendiz = p_id_aprendiz;
    set ultimo_numero_visita = ultimo_numero_visita + 1;
    
    INSERT INTO aprendices_visitas (estado_visita, numero_visita, observaciones_visita, usuario_responsable) values (IFNULL(p_estado_visita, "Sin Realizar"), ultimo_numero_visita, p_observaciones_visita, p_usuario_responsable);
    
    set @ultimo_id = last_insert_id();
    insert into aprendices_visitas_detalles(id_aprendiz, id_visita) values (p_id_aprendiz, @ultimo_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `TotalAprendicesEnPracticas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `TotalAprendicesEnPracticas`(
    IN instructor_nombre VARCHAR(255)
)
BEGIN
    SELECT 
        CONCAT(u.nombres_usuario, ' ', u.apellidos_usuario) AS nombre_instructor,
        COUNT(CASE WHEN a.estado_aprendiz = 'prácticas' THEN 1 ELSE NULL END) AS total_aprendices_practicas
    FROM 
        usuarios u
    LEFT JOIN 
        fichas f ON u.id_usuario = f.id_instructor_seguimiento OR u.id_usuario = f.id_instructor_lider
    LEFT JOIN 
        detalle_fichas_aprendices dfa ON f.id_ficha = dfa.id_ficha
    LEFT JOIN 
        aprendices a ON dfa.id_aprendiz = a.id_aprendiz
    WHERE 
        CONCAT(u.nombres_usuario, ' ', u.apellidos_usuario) = instructor_nombre
    GROUP BY 
        nombre_instructor;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `uspAprendicesPorNumeroFicha` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAprendicesPorNumeroFicha`(_numeroFicha varchar(50))
BEGIN
	DECLARE id_ficha_buscada varchar(50);
    SELECT id_ficha INTO id_ficha_buscada FROM fichas where numero_ficha LIKE _numeroFicha;
	SELECT fichas.numero_ficha, fichas.nombre_programa_formacion, aprendices.* FROM fichas INNER JOIN detalle_fichas_aprendices ON fichas.id_ficha = detalle_fichas_aprendices.id_ficha INNER JOIN aprendices ON aprendices.id_aprendiz = detalle_fichas_aprendices.id_aprendiz WHERE fichas.id_ficha = id_ficha_buscada;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-15 14:37:28
