CREATE DATABASE  IF NOT EXISTS `sena_practicas` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sena_practicas`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: sena_practicas
-- ------------------------------------------------------
-- Server version	8.0.33

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
  `email_aprendiz` varchar(500) NOT NULL,
  `celular_aprendiz` varchar(100) NOT NULL,
  `fecha_fin_practica_aprendiz` date NOT NULL,
  `estado_aprendiz` varchar(300) NOT NULL,
  `id_empresa` int NOT NULL,
  `id_modalidad` int NOT NULL,
  `id_jefe` int NOT NULL,
  `id_arl` int NOT NULL,
  PRIMARY KEY (`id_aprendiz`),
  KEY `id_empresa` (`id_empresa`),
  KEY `id_modalidad` (`id_modalidad`),
  KEY `id_jefe` (`id_jefe`),
  KEY `id_arl` (`id_arl`),
  CONSTRAINT `aprendices_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `aprendices_ibfk_2` FOREIGN KEY (`id_modalidad`) REFERENCES `modalidades` (`id_modalidad`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `aprendices_ibfk_3` FOREIGN KEY (`id_jefe`) REFERENCES `jefes` (`id_jefe`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `aprendices_ibfk_4` FOREIGN KEY (`id_arl`) REFERENCES `arl` (`id_arl`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprendices`
--

LOCK TABLES `aprendices` WRITE;
/*!40000 ALTER TABLE `aprendices` DISABLE KEYS */;
INSERT INTO `aprendices` VALUES (1,'Lorena','Quiceno Giraldo','CC','1028882894','lorenquiceno@gmail.com','3245887367','2023-11-02','practicas',1,1,1,1),(2,'Stiven','Benjumea','CC','1028882444','stevenbenjumea9@gmail.com','3245880123','2023-11-02','practicas',1,1,1,1),(3,'Stiven','Blandón Urrego','CC','1017924888','blandon0207s@gmail.com','3183577499','2023-11-02','practicas',1,1,1,1),(5,'Juan Guillermo','Gomez Zapata','CC','1027800913','juanlestar0408@gmail.com','3006953395','2023-10-05','Practicas',1,1,1,1);
/*!40000 ALTER TABLE `aprendices` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arl`
--

LOCK TABLES `arl` WRITE;
/*!40000 ALTER TABLE `arl` DISABLE KEYS */;
INSERT INTO `arl` VALUES (1,'SURA');
/*!40000 ALTER TABLE `arl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bitacoras`
--

DROP TABLE IF EXISTS `bitacoras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bitacoras` (
  `id_bitacora` int NOT NULL AUTO_INCREMENT,
  `fecha_bitacora` date NOT NULL,
  `estado_bitacora` varchar(200) NOT NULL,
  `numero_bitacora` varchar(100) NOT NULL,
  `calificacion_bitacora` double NOT NULL,
  PRIMARY KEY (`id_bitacora`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bitacoras`
--

LOCK TABLES `bitacoras` WRITE;
/*!40000 ALTER TABLE `bitacoras` DISABLE KEYS */;
/*!40000 ALTER TABLE `bitacoras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_empresas`
--

DROP TABLE IF EXISTS `detalle_empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_empresas` (
  `id_detalle_empresa` int NOT NULL AUTO_INCREMENT,
  `nombre_sede_empresa` varchar(300) DEFAULT NULL,
  `telefono_empresa` varchar(300) DEFAULT NULL,
  `direccion_sede_empresa` varchar(500) DEFAULT NULL,
  `id_localidad` int NOT NULL,
  PRIMARY KEY (`id_detalle_empresa`),
  KEY `id_localidad` (`id_localidad`),
  CONSTRAINT `detalle_empresas_ibfk_1` FOREIGN KEY (`id_localidad`) REFERENCES `localidades` (`id_localidad`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_empresas`
--

LOCK TABLES `detalle_empresas` WRITE;
/*!40000 ALTER TABLE `detalle_empresas` DISABLE KEYS */;
INSERT INTO `detalle_empresas` VALUES (1,'Vizcaya','412456','El poblado',1);
/*!40000 ALTER TABLE `detalle_empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_fichas_aprendices`
--

DROP TABLE IF EXISTS `detalle_fichas_aprendices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_fichas_aprendices` (
  `id_ficha` int NOT NULL,
  `id_aprendiz` int NOT NULL,
  KEY `id_ficha` (`id_ficha`),
  KEY `id_aprendiz` (`id_aprendiz`),
  CONSTRAINT `detalle_fichas_aprendices_ibfk_1` FOREIGN KEY (`id_ficha`) REFERENCES `fichas` (`id_ficha`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detalle_fichas_aprendices_ibfk_2` FOREIGN KEY (`id_aprendiz`) REFERENCES `aprendices` (`id_aprendiz`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_fichas_aprendices`
--

LOCK TABLES `detalle_fichas_aprendices` WRITE;
/*!40000 ALTER TABLE `detalle_fichas_aprendices` DISABLE KEYS */;
INSERT INTO `detalle_fichas_aprendices` VALUES (1,1),(1,2);
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
  PRIMARY KEY (`id_detalle_inscripcion`),
  KEY `id_inscripcion` (`id_inscripcion`),
  CONSTRAINT `detalles_inscripciones_ibfk_1` FOREIGN KEY (`id_inscripcion`) REFERENCES `inscripciones` (`id_inscripcion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_inscripciones`
--

LOCK TABLES `detalles_inscripciones` WRITE;
/*!40000 ALTER TABLE `detalles_inscripciones` DISABLE KEYS */;
INSERT INTO `detalles_inscripciones` VALUES (1,'3','Rechazado',NULL,1),(2,'4','Pendiente',NULL,1),(3,'2','Pendiente',NULL,1),(4,'3','Pendiente',NULL,2),(5,'4','Pendiente',NULL,2),(6,'2','Pendiente',NULL,2),(7,'3','Aprobado',NULL,3),(8,'4','Aprobado',NULL,3),(9,'2','Aprobado',NULL,3),(10,'3','Pendiente',NULL,4),(11,'4','Pendiente',NULL,4),(12,'2','Pendiente',NULL,4),(13,'3','Pendiente',NULL,5),(14,'4','Pendiente',NULL,5),(15,'2','Pendiente',NULL,5);
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tr_upd_estado_inscripcion` AFTER UPDATE ON `detalles_inscripciones` FOR EACH ROW BEGIN
  -- Verificar si el nuevo estado es "Rechazado"
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `inscripcion_aprobada_trigger` AFTER UPDATE ON `detalles_inscripciones` FOR EACH ROW BEGIN
    DECLARE total_aprobados INT;
    DECLARE var_nombre_aprendiz VARCHAR(100);
    DECLARE var_apellido_aprendiz VARCHAR(100);
    DECLARE var_tipo_documento_aprendiz VARCHAR(50);
    DECLARE var_numero_documento_aprendiz VARCHAR(100);
    DECLARE var_email_aprendiz VARCHAR(500);
    DECLARE var_celular_aprendiz VARCHAR(100);
    DECLARE fecha_fin_lectiva_inscripcion_sum DATE;
    DECLARE var_fecha_fin_practica_aprendiz DATE;
    DECLARE var_estado_aprendiz VARCHAR(300);
    
    -- Verificar si todos los detalles_inscripciones relacionados al id_inscripcion están en "Aprobado"
    SELECT COUNT(*) INTO total_aprobados
    FROM detalles_inscripciones
    WHERE id_inscripcion = NEW.id_inscripcion AND estado_aval = 'Aprobado';

    IF total_aprobados = 3 THEN
        -- Cambiar el estado_general_inscripcion a "Aprobado" en la tabla inscripciones
        UPDATE inscripciones SET estado_general_inscripcion = 'Aprobado' WHERE id_inscripcion = NEW.id_inscripcion;

        -- Obtener los datos necesarios para crear el nuevo aprendiz
        SELECT nombre_inscripcion, apellido_inscripcion, tipo_documento_inscripcion, documento_inscripción, email_inscripcion, inscripción_celular, fecha_fin_lectiva_inscripcion
        INTO var_nombre_aprendiz, var_apellido_aprendiz, var_tipo_documento_aprendiz, var_numero_documento_aprendiz, var_email_aprendiz, var_celular_aprendiz, fecha_fin_lectiva_inscripcion_sum
        FROM inscripciones WHERE id_inscripcion = NEW.id_inscripcion;

        -- Calcular la fecha de fin de práctica sumando 6 meses a la fecha_fin_lectiva_inscripcion
        SET var_fecha_fin_practica_aprendiz = DATE_ADD(fecha_fin_lectiva_inscripcion_sum, INTERVAL 6 MONTH);

        -- Determinar el estado del aprendiz
        IF CURDATE() BETWEEN fecha_fin_lectiva_inscripcion_sum AND var_fecha_fin_practica_aprendiz THEN
            SET var_estado_aprendiz = 'Practicas';
        ELSEIF CURDATE() < fecha_fin_lectiva_inscripcion THEN
            SET var_estado_aprendiz = 'Lectiva';
        ELSE
            SET var_estado_aprendiz = 'Terminado';
        END IF;

        -- Insertar el nuevo aprendiz en la tabla 'aprendices'
        INSERT INTO aprendices (nombre_aprendiz, apellido_aprendiz, tipo_documento_aprendiz, numero_documento_aprendiz, email_aprendiz, celular_aprendiz, fecha_fin_practica_aprendiz, estado_aprendiz, id_empresa, id_modalidad, id_jefe, id_arl)
        VALUES (var_nombre_aprendiz, var_apellido_aprendiz, var_tipo_documento_aprendiz, var_numero_documento_aprendiz, var_email_aprendiz, var_celular_aprendiz, var_fecha_fin_practica_aprendiz, var_estado_aprendiz, 1, 1, 1, 1);
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
  `email_empresa` varchar(500) NOT NULL,
  `id_detalle_empresa` int NOT NULL,
  PRIMARY KEY (`id_empresa`),
  KEY `id_detalle_empresa` (`id_detalle_empresa`),
  CONSTRAINT `empresas_ibfk_1` FOREIGN KEY (`id_detalle_empresa`) REFERENCES `detalle_empresas` (`id_detalle_empresa`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,'Telepermance','4127254355','TpColombia@teleperformance.co',1);
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
  `fecha_inicio_lectiva` date NOT NULL,
  `fecha_fin_lectiva` date NOT NULL,
  `fecha_inicio_practica` date NOT NULL,
  `id_instructor_seguimiento` int NOT NULL,
  `id_instructor_lider` int NOT NULL,
  `id_nivel_formacion` int NOT NULL,
  PRIMARY KEY (`id_ficha`),
  KEY `fk_fichas_1` (`id_instructor_seguimiento`),
  KEY `id_nivel_formacion` (`id_nivel_formacion`),
  KEY `fk_fichas_2` (`id_instructor_lider`) /*!80000 INVISIBLE */,
  CONSTRAINT `fichas_ibfk_1` FOREIGN KEY (`id_nivel_formacion`) REFERENCES `niveles_formacion` (`id_nivel_formacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_fichas_1` FOREIGN KEY (`id_instructor_seguimiento`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `fk_fichas_2` FOREIGN KEY (`id_instructor_lider`) REFERENCES `usuarios` (`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichas`
--

LOCK TABLES `fichas` WRITE;
/*!40000 ALTER TABLE `fichas` DISABLE KEYS */;
INSERT INTO `fichas` VALUES (1,'2473196','ADSO','2022-02-01','2023-04-30','2023-05-01',3,4,2);
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
  `nombre_inscripcion` varchar(300) NOT NULL,
  `apellido_inscripcion` varchar(300) NOT NULL,
  `tipo_documento_inscripcion` varchar(100) NOT NULL,
  `documento_inscripcion` varchar(100) NOT NULL,
  `email_inscripcion` varchar(300) NOT NULL,
  `inscripcion_celular` varchar(20) NOT NULL,
  `etapa_actual_inscripcion` varchar(100) NOT NULL,
  `modalidad_inscripcion` varchar(300) NOT NULL,
  `nombre_programa_inscripcion` varchar(300) NOT NULL,
  `nivel_formacion_inscripcion` varchar(100) NOT NULL,
  `numero_ficha_inscripcion` varchar(20) NOT NULL,
  `fecha_fin_lectiva_inscripcion` date NOT NULL,
  `nombre_instructor_lider_inscripcion` varchar(200) NOT NULL,
  `email_instructor_lider_inscripcion` varchar(200) NOT NULL,
  `apoyo_sostenimiento_inscripcion` varchar(500) NOT NULL,
  `nit_empresa_inscripcion` varchar(200) DEFAULT NULL,
  `nombre_empresa_inscripcion` varchar(500) DEFAULT NULL,
  `direccion_empresa_inscripcion` varchar(300) DEFAULT NULL,
  `nombre_jefe_empresa_inscripcion` varchar(300) DEFAULT NULL,
  `cargo_jefe_empresa_inscripcion` varchar(300) DEFAULT NULL,
  `telefono_jefe_empresa_inscripcion` varchar(300) DEFAULT NULL,
  `email_jefe_empresa_inscripcion` varchar(300) DEFAULT NULL,
  `arl` varchar(1000) DEFAULT NULL,
  `link_documentos` varchar(100) NOT NULL,
  `observaciones` varchar(2500) NOT NULL,
  `estado_general_inscripcion` varchar(60) NOT NULL DEFAULT 'Pendiente',
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `responsable_inscripcion` varchar(100) NOT NULL,
  PRIMARY KEY (`id_inscripcion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripciones`
--

LOCK TABLES `inscripciones` WRITE;
/*!40000 ALTER TABLE `inscripciones` DISABLE KEYS */;
INSERT INTO `inscripciones` VALUES (1,'Stiven','Blandón Urrego','CC','1017924888','blandon0207s@gmail.com','3183577499','lectiva','1','ADSO','tecnologia','2473196','2023-04-30','Adelaida','adelaida@misena.edu.co','ninguno',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'empresa','pdf.pdf','N/A','Rechazado','2023-07-27 16:34:43','Admin Admin'),(2,'Lorena','Quiceno Giraldo','CC','1082882294','lorenquiceno@gmail.com','3245887367','practica','2','Análisis y Desarrollo de Software','tecnologia','2473196','2023-04-30','Adelaida','adelaida@misena.edu.co','FIC','9003238537','Teleperformance','Cra 23 # 94a-33','Alejandra Tabarez','Recursos Humanos','3203456755','Alejandra@teleperformance.com','empresa','pdf(1).pdf','N/A','Pendiente','2023-07-27 17:16:00','Admin Admin'),(3,'Juan Guillermo','Gomez Zapata','CC','1027800913','juanlestar0408@gmail.com','3006953395','practica','2','ADSO','tecnologia','2473196','2023-04-05','Adelaida','acanom@sena.edu.co','jovenes en accion','9003238537','Teleperformance','Cra 40 #43b-33','Jessica Martinez','HHRR','3233459687','jessicalamejor@teleformance.co','empresa','pdf(1)(1).pdf','Ninguna','Aprobado','2023-07-28 16:23:38','Admin Admin'),(4,'Angie Tatiana','Mosquera','CC','1027150354','atatianmosquera@gmail.com','3012491058','lectiva','5','ADSO','tecnologia','2473196','2023-04-30','Adelaida','adelaida@misena.edu.co','apoyo de sostenimiento sena','9003238537','Teleperformance','Cra 23 # 94a-33','Alejandra Tabarez','Recursos Humanos','3203456755','Alejandra@teleperformance.com','empresa','pdf(3).pdf','N/A','Pendiente','2023-08-18 15:30:13','Admin Admin'),(5,'Angie Tatiana','Mosquera','CC','1027150354','atatianmosquera@gmail.com','3012491058','lectiva','5','ADSO','tecnologia','2473196','2023-04-30','Adelaida','adelaida@misena.edu.co','apoyo de sostenimiento sena','9003238537',NULL,'Cra 23 # 94a-33','Alejandra Tabarez','Recursos Humanos','3203456755','Alejandra@teleperformance.com','empresa','pdf(3).pdf','N/A','Pendiente','2023-08-18 16:05:15','Admin Admin');
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
  DECLARE instructor_lider_id INT;
  DECLARE responsable_rol2_id INT;
  
  -- Obtener el ID del instructor de seguimiento basado en el número de ficha
  SELECT id_instructor_seguimiento INTO instructor_seguimiento_id
  FROM fichas
  WHERE numero_ficha = NEW.numero_ficha_inscripcion;
  
  -- Obtener el ID del instructor líder basado en el número de ficha
  SELECT id_instructor_lider INTO instructor_lider_id
  FROM fichas
  WHERE numero_ficha = NEW.numero_ficha_inscripcion;
  
  -- Obtener el ID del usuario con id_rol 2
  SELECT id_usuario INTO responsable_rol2_id
  FROM usuarios
  WHERE id_rol = 2;
  
  -- Insertar los tres registros en detalles_inscripciones
  INSERT INTO detalles_inscripciones (responsable_aval, estado_aval, id_inscripcion)
  VALUES (instructor_seguimiento_id, 'Pendiente', NEW.id_inscripcion),
         (instructor_lider_id, 'Pendiente', NEW.id_inscripcion),
         (responsable_rol2_id, 'Pendiente', NEW.id_inscripcion);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jefes`
--

LOCK TABLES `jefes` WRITE;
/*!40000 ALTER TABLE `jefes` DISABLE KEYS */;
INSERT INTO `jefes` VALUES (1,'Alejandra Quecam','TAM','302124145','rousy@teleperformance.co');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `niveles_formacion`
--

LOCK TABLES `niveles_formacion` WRITE;
/*!40000 ALTER TABLE `niveles_formacion` DISABLE KEYS */;
INSERT INTO `niveles_formacion` VALUES (1,'Tecnico'),(2,'Tecnologo');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador'),(2,'Coordinador'),(3,'Instructor de Seguimiento'),(4,'Instructor Líder');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seguimientos`
--

DROP TABLE IF EXISTS `seguimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seguimientos` (
  `id_seguimiento` int NOT NULL AUTO_INCREMENT,
  `administracion_educativa` varchar(500) NOT NULL,
  `observacion` longtext,
  `id_aprendiz` int NOT NULL,
  `id_visita` int NOT NULL,
  `id_bitacora` int NOT NULL,
  PRIMARY KEY (`id_seguimiento`),
  KEY `id_aprendiz` (`id_aprendiz`),
  KEY `id_visita` (`id_visita`),
  KEY `id_bitacora` (`id_bitacora`),
  CONSTRAINT `seguimientos_ibfk_1` FOREIGN KEY (`id_aprendiz`) REFERENCES `aprendices` (`id_aprendiz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `seguimientos_ibfk_2` FOREIGN KEY (`id_visita`) REFERENCES `visitas` (`id_visita`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `seguimientos_ibfk_3` FOREIGN KEY (`id_bitacora`) REFERENCES `bitacoras` (`id_bitacora`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguimientos`
--

LOCK TABLES `seguimientos` WRITE;
/*!40000 ALTER TABLE `seguimientos` DISABLE KEYS */;
/*!40000 ALTER TABLE `seguimientos` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Admin','Admin','CC','1234567890','juanlestar12@gmail.com','3195810996','$2b$10$G/qBWAkBBWWYv168liiN4.yNHoflbKb9y6nUEFZvtVomsVCNQhmo6',1),(2,'Stiven','Blandón','CC','1017924888','blandon0207s@gmail.com','3183577499','$2b$10$GWUNM.FJKmU81l5dW0pDBOuc5EGYTeYjJxa9ENNNaioKoWM3QR.aq',2),(3,'Adelaida','Benavidez','CC','1017923453','adelaida@misena.edu.co','3183575433','$2b$10$wskcGpv.zlFyAp1gWLZSpunAe5uqGcgJ2yAhpzOQyRWdlpp./jUkG',4),(4,'Juan','Esteban','CC','1064973453','juanEsteban45@misena.edu.co','3133675433','$2b$10$SAeF4T/nxMHjfl5LhHzqjOI920j/dS9CU8NCpDecLicv.kSxegV/m',3);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitas`
--

DROP TABLE IF EXISTS `visitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitas` (
  `id_visita` int NOT NULL AUTO_INCREMENT,
  `fecha_visita` date NOT NULL,
  `numero_visita` varchar(100) NOT NULL,
  `observaciones_visita` longtext,
  `id_instructor_seguimiento` int NOT NULL,
  PRIMARY KEY (`id_visita`),
  KEY `fk_visitas_1` (`id_instructor_seguimiento`),
  CONSTRAINT `fk_visitas_1` FOREIGN KEY (`id_instructor_seguimiento`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitas`
--

LOCK TABLES `visitas` WRITE;
/*!40000 ALTER TABLE `visitas` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sena_practicas'
--

--
-- Dumping routines for database 'sena_practicas'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18 11:08:21
