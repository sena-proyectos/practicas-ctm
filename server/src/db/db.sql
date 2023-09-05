CREATE DATABASE  IF NOT EXISTS `sena_practicas` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sena_practicas`;
-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: sena_practicas
-- ------------------------------------------------------
-- Server version	8.0.34

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
INSERT INTO `aprendices` VALUES (1,'Lorena','Quiceno Giraldo','CC','1028882894','lorenquiceno@gmail.com','3245887367','2023-11-02','Prácticas',1,1,1,1),(2,'Stiven','Benjumea','CC','1028882444','stevenbenjumea9@gmail.com','3245880123','2023-11-02','Prácticas',1,2,1,1),(3,'Stiven','Blandón Urrego','CC','1017924888','blandon0207s@gmail.com','3183577499','2023-11-02','Prácticas',1,3,1,1),(4,'Juan Guillermo','Gomez Zapata','CC','1027800913','juanlestar0408@gmail.com','3006953395','2023-10-05','Prácticas',1,4,1,1),(5,'Eyson','Quiceno Giraldo','CC','1092925678','eysonquiceno@gmail.com','3135189268','2024-12-06','Lectiva',1,5,1,1);
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
  `id_detalle_ficha_aprendiz` int NOT NULL AUTO_INCREMENT,
  `id_ficha` int NOT NULL,
  `id_aprendiz` int NOT NULL,
  PRIMARY KEY (`id_detalle_ficha_aprendiz`),
  UNIQUE KEY `id_detalle_ficha_aprendiz_UNIQUE` (`id_detalle_ficha_aprendiz`),
  KEY `id_ficha` (`id_ficha`),
  KEY `id_aprendiz` (`id_aprendiz`),
  CONSTRAINT `detalle_fichas_aprendices_ibfk_1` FOREIGN KEY (`id_ficha`) REFERENCES `fichas` (`id_ficha`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detalle_fichas_aprendices_ibfk_2` FOREIGN KEY (`id_aprendiz`) REFERENCES `aprendices` (`id_aprendiz`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_fichas_aprendices`
--

LOCK TABLES `detalle_fichas_aprendices` WRITE;
/*!40000 ALTER TABLE `detalle_fichas_aprendices` DISABLE KEYS */;
INSERT INTO `detalle_fichas_aprendices` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5);
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
  PRIMARY KEY (`id_detalle_inscripcion`),
  KEY `id_inscripcion` (`id_inscripcion`),
  KEY `fk_detalles_inscripciones_2_idx` (`rol_responsable`),
  CONSTRAINT `detalles_inscripciones_ibfk_1` FOREIGN KEY (`id_inscripcion`) REFERENCES `inscripciones` (`id_inscripcion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_detalles_inscripciones_2` FOREIGN KEY (`rol_responsable`) REFERENCES `roles` (`id_rol`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_inscripciones`
--

LOCK TABLES `detalles_inscripciones` WRITE;
/*!40000 ALTER TABLE `detalles_inscripciones` DISABLE KEYS */;
INSERT INTO `detalles_inscripciones` VALUES (1,'1','Pendiente',NULL,1,1,'Documento completo'),(2,'1','Pendiente',NULL,1,1,'RAPS aprobados'),(3,'4','Pendiente',NULL,1,3,'Funciones'),(4,'6','Pendiente',NULL,1,2,'Aval'),(5,'1','Pendiente',NULL,2,1,'Documento completo'),(6,'1','Pendiente',NULL,2,1,'RAPS aprobados'),(7,'4','Pendiente',NULL,2,3,'Funciones'),(8,'6','Pendiente',NULL,2,2,'Aval'),(9,'1','Pendiente',NULL,3,1,'Documento completo'),(10,'1','Pendiente',NULL,3,1,'RAPS aprobados'),(11,'4','Pendiente',NULL,3,3,'Funciones'),(12,'6','Pendiente',NULL,3,2,'Aval'),(13,'1','Pendiente',NULL,4,1,'Documento completo'),(14,'1','Pendiente',NULL,4,1,'RAPS aprobados'),(15,'4','Pendiente',NULL,4,3,'Funciones'),(16,'6','Pendiente',NULL,4,2,'Aval'),(17,'1','Pendiente',NULL,5,1,'Documento completo'),(18,'1','Pendiente',NULL,5,1,'RAPS aprobados'),(19,'4','Pendiente',NULL,5,3,'Funciones'),(20,'6','Pendiente',NULL,5,2,'Aval');
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
  `id_instructor_seguimiento` int DEFAULT NULL,
  `id_instructor_lider` int DEFAULT NULL,
  `id_nivel_formacion` int NOT NULL,
  PRIMARY KEY (`id_ficha`),
  KEY `fk_fichas_1` (`id_instructor_seguimiento`),
  KEY `id_nivel_formacion` (`id_nivel_formacion`),
  KEY `fk_fichas_2` (`id_instructor_lider`) /*!80000 INVISIBLE */,
  CONSTRAINT `fichas_ibfk_1` FOREIGN KEY (`id_nivel_formacion`) REFERENCES `niveles_formacion` (`id_nivel_formacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_fichas_1` FOREIGN KEY (`id_instructor_seguimiento`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `fk_fichas_2` FOREIGN KEY (`id_instructor_lider`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichas`
--

LOCK TABLES `fichas` WRITE;
/*!40000 ALTER TABLE `fichas` DISABLE KEYS */;
INSERT INTO `fichas` VALUES (1,'2473196','Análisis y Desarrollo de Software','2022-02-01','2023-02-10','2023-04-01',4,NULL,2);
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
INSERT INTO `inscripciones` VALUES (1,'Stiven','Blandón Urrego','Tarjeta de identidad','1017924888','blandon0207s@gmail.com','3183577499','Productiva','4','ADSO','Tecnólogo','2473196','2023-04-05','juan','adelaidalamejor@misena.edu.co','Ninguno',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'El SENA','doc.pdf','N/A','Pendiente','2023-08-29 18:59:53','Admin Admin'),(2,'Juan Guillermo','Gómez Zapata','Cédula de ciudadanía','1027800913','jggomez016@gmail.com','3195810996','Productiva','2','ADSO','Tecnólogo','2473196','2023-04-05','roberto','adelaidalamejor@misena.edu.co','Ninguno','900323853','TELEPERFORMANCE','CALLE 26 92 32','Richard Alexander Betancur Sierra','Presidente','3002694862','rabs@gmail.com',NULL,'doc1.pdf','Big empresa','Pendiente','2023-08-29 18:59:53','Admin Admin'),(3,'Guillermo Stiven','Benjumea Morales','Cédula de ciudadanía','1040491426','stevenbenjumea9@gmail.com','3016911686','Productiva','1','ADSO','Tecnólogo','2473196','2023-04-05','juan','adelaidalamejor@misena.edu.co','Ninguno','900323853','TELEPERFORMANCE','CALLE 26 92 32','Richard Alexander Betancur Sierra','Presidente','3002694862','jessica@gmail.com','La empresa','doc2.pdf','NULL','Pendiente','2023-08-29 18:59:53','Admin Admin'),(4,'Lorena','Quiceno Giraldo','Cédula de ciudadanía','1082882294','lorenquiceno@gmail.com','3245887367','Productiva','3','ADSO','Tecnólogo','2473196','2023-04-05','roberto','adelaidalamejor@misena.edu.co','Ninguno','900323853','TELEPERFORMANCE','CALLE 26 92 32','Richard Alexander Betancur Sierra','Presidente','3002694862','correo@gmail.com','EL SENA','doc3.pdf','Todo melo','Pendiente','2023-08-29 18:59:53','Admin Admin'),(5,'Maria Elena ','David','Cédula de ciudadanía','30079181','mariaelenad863@gmail.com','3152116968','Lectiva','5','ADSI','Técnico','2478032','2023-04-05','roberto','adelaidalamejor@misena.edu.co','Ninguno','900323853','TELEPERFORMANCE','CALLE 26 92 32','Richard Alexander Betancur Sierra','Presidente','3002694862','correo@gmail.com','EL SENA','archivos.pdf','Todo melo','Pendiente','2023-08-29 18:59:53','Admin Admin');
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
  (instructor_seguimiento_id, 'Pendiente', NEW.id_inscripcion, rol_instructor_seguimiento, 'Funciones'),
  (coordinador_id, 'Pendiente', NEW.id_inscripcion, rol_coordinador, 'Aval');
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
INSERT INTO `roles` VALUES (1,'Instructor líder de prácticas'),(2,'Coordinador'),(3,'Instructor de Seguimiento'),(4,'Instructor Líder');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Admin','Admin','CC','1234567890','juanlestar12@gmail.com','3195810996','$2b$10$G/qBWAkBBWWYv168liiN4.yNHoflbKb9y6nUEFZvtVomsVCNQhmo6',1),(2,'Stiven','Blandón','CC','1017924888','blandon0207s@gmail.com','3183577499','$2b$10$GWUNM.FJKmU81l5dW0pDBOuc5EGYTeYjJxa9ENNNaioKoWM3QR.aq',2),(3,'Adelaida','Benavidez','CC','1017923453','adelaida@misena.edu.co','3183575433','$2b$10$wskcGpv.zlFyAp1gWLZSpunAe5uqGcgJ2yAhpzOQyRWdlpp./jUkG',4),(4,'Juan','Esteban','CC','1064973453','juanEsteban45@misena.edu.co','3133675433','$2b$10$SAeF4T/nxMHjfl5LhHzqjOI920j/dS9CU8NCpDecLicv.kSxegV/m',1),(5,'Líder','Líder','CC','1234567809','Liderlider@gmail.com','3195810996','$2b$10$dfg1Lu3pt3y169EKQZPKeOHPu/dcqpEOfPbwFgtkhAnegXbMFBAyS',4),(6,'Coordi','Coordi','CC','1234567098','Coordicoordi@gmail.com','3195810996','$2b$10$qN1T5s1.6iHJhiyayLFl5u8MK7YeKpaIz7U8ATCJilojcFl3a3kvG',2),(7,'Seguim','Seguim','CC','1234560987','Seguimseguim@gmail.com','3195810996','$2b$10$AWKbnyNkMJ9MlVOuBlTk4.0R8Kx.e5appDM5E.1bw4QoYyQaQ85zq',3);
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

-- Dump completed on 2023-08-29 19:18:14
