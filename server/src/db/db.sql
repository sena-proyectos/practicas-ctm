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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprendices`
--

LOCK TABLES `aprendices` WRITE;
/*!40000 ALTER TABLE `aprendices` DISABLE KEYS */;
INSERT INTO `aprendices` VALUES (1,'Stiven','Blandón Urrego','CC','1017924888','blandon0207s@gmail.com','3183577499','2023-11-02','practicas',1,1,1,1);
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
  `responsable_aval` varchar(100) NOT NULL,
  `estado_aval` varchar(100) NOT NULL,
  `observaciones` varchar(500) NOT NULL,
  `id_inscripcion` int NOT NULL,
  PRIMARY KEY (`id_detalle_inscripcion`),
  KEY `id_inscripcion` (`id_inscripcion`),
  CONSTRAINT `detalles_inscripciones_ibfk_1` FOREIGN KEY (`id_inscripcion`) REFERENCES `inscripciones` (`id_inscripcion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_inscripciones`
--

LOCK TABLES `detalles_inscripciones` WRITE;
/*!40000 ALTER TABLE `detalles_inscripciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalles_inscripciones` ENABLE KEYS */;
UNLOCK TABLES;

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
  `id_nivel_formacion` int NOT NULL,
  PRIMARY KEY (`id_ficha`),
  KEY `fk_fichas_1` (`id_instructor_seguimiento`),
  KEY `id_nivel_formacion` (`id_nivel_formacion`),
  CONSTRAINT `fichas_ibfk_1` FOREIGN KEY (`id_nivel_formacion`) REFERENCES `niveles_formacion` (`id_nivel_formacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_fichas_1` FOREIGN KEY (`id_instructor_seguimiento`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichas`
--

LOCK TABLES `fichas` WRITE;
/*!40000 ALTER TABLE `fichas` DISABLE KEYS */;
INSERT INTO `fichas` VALUES (1,'2473196','ADSO','2023-03-22','2023-05-22','2023-05-23',1,1);
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
  `documento_inscripción` varchar(100) NOT NULL,
  `email_inscripcion` varchar(300) NOT NULL,
  `inscripción_celular` varchar(20) NOT NULL,
  `etapa_actual_inscripcion` varchar(100) NOT NULL,
  `modalidad_inscripción` varchar(300) NOT NULL,
  `nombre_programa_inscripción` varchar(300) NOT NULL,
  `nivel_formacion_inscripcion` varchar(100) NOT NULL,
  `numero_ficha_inscripcion` varchar(20) NOT NULL,
  `fecha_fin_lectiva_inscripcion` date NOT NULL,
  `nombre_instructor_lider_inscripcion` varchar(200) DEFAULT NULL,
  `email_instructor_lider_inscripcion` varchar(200) NOT NULL,
  `apoyo_sostenimiento_inscripcion` varchar(500) NOT NULL,
  `nit_empresa_inscripcion` varchar(200) DEFAULT NULL,
  `nombre_empresa_inscripción` varchar(500) DEFAULT NULL,
  `direccion_empresa_inscripcion` varchar(300) DEFAULT NULL,
  `nombre_jefe_empresa_inscripcion` varchar(300) DEFAULT NULL,
  `cargo_jefe_empresa_inscripcion` varchar(300) DEFAULT NULL,
  `telefono_jefe_empresa_inscripcion` int DEFAULT NULL,
  `email_jefe_empresa_inscripcion` varchar(300) NOT NULL,
  `arl` varchar(1000) NOT NULL,
  `link_documentos` varchar(100) NOT NULL,
  `observaciones` varchar(2500) NOT NULL,
  PRIMARY KEY (`id_inscripcion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripciones`
--

LOCK TABLES `inscripciones` WRITE;
/*!40000 ALTER TABLE `inscripciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `inscripciones` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modalidades`
--

LOCK TABLES `modalidades` WRITE;
/*!40000 ALTER TABLE `modalidades` DISABLE KEYS */;
INSERT INTO `modalidades` VALUES (1,'Contrato de aprendizaje',200,800),(2,'Pasantias',100,300);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador'),(2,'Coordinador'),(3,'Instructor de Seguimiento');
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
  `password_usuario` varchar(500) NOT NULL,
  `id_rol` int NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Cristian','Torres','C.C','1027944969','torres.torres@gmail.com','3007030424','NoTengoEso',1),(2,'Juan','Gomez','C.C','1024643525','juansena@gmail.com','3012455455','Hola',2),(23,'Lorena','Quiceno','C.C','1420134125','lorenaquincena@gmail.com','3421015526','TresHola',3),(24,'Stiven','Morales','C.C','1464210246','moralesstiven@gmail.com','3224567120','CuatroHola',3),(25,'Juan','Prasca','C.C','1750134256','prascamedina@gmail.com','3104756421','HolaCinco',2),(26,'Tatiana','Tati','C.C','1432412541','TatiTatiana@gmail.com','3004104210','SeisHolaSi',1),(27,'Jairo','Redondo','C.C','1348123042','RedondoRedondo@gmail.com','3042310455','SieteHola',3),(28,'Kevin','Chica','C.C','1437762253','ChicaCantante@gmail.com','3014315282','OchoHola',2),(29,'Lorena','Quiceno','C.C','1420134125','lorenaquincena@gmail.com','3421015526','TresHola',3),(30,'Stiven','Morales','C.C','1464210246','moralesstiven@gmail.com','3224567120','CuatroHola',3),(31,'Juan','Prasca','C.C','1750134256','prascamedina@gmail.com','3104756421','HolaCinco',2),(32,'Tatiana','Tati','C.C','1432412541','TatiTatiana@gmail.com','3004104210','SeisHolaSi',1),(33,'Jairo','Redondo','C.C','1348123042','RedondoRedondo@gmail.com','3042310455','SieteHola',3),(34,'Kevin','Chica','C.C','1437762253','ChicaCantante@gmail.com','3014315282','OchoHola',2);
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

-- Dump completed on 2023-07-17 13:45:51
