CREATE DATABASE  IF NOT EXISTS `practicas_sena` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `practicas_sena`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: practicas_sena
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
-- Table structure for table `detalles_empresas`
--

DROP TABLE IF EXISTS `detalles_empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalles_empresas` (
  `id_detalle_empresa` int NOT NULL AUTO_INCREMENT,
  `sede_detalle_empresa` varchar(50) NOT NULL,
  `telefono_detalle_empresa` varchar(20) NOT NULL,
  `direccion_detalle_empresa` varchar(60) NOT NULL,
  `id_localidad` int NOT NULL,
  PRIMARY KEY (`id_detalle_empresa`),
  KEY `detalles_empresas_ibfk_1` (`id_localidad`),
  CONSTRAINT `detalles_empresas_ibfk_1` FOREIGN KEY (`id_localidad`) REFERENCES `localidades` (`id_localidad`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_empresas`
--

LOCK TABLES `detalles_empresas` WRITE;
/*!40000 ALTER TABLE `detalles_empresas` DISABLE KEYS */;
INSERT INTO `detalles_empresas` VALUES (1,'Chapinero','2896541','Calle 42 #74-25 Piso 4',1);
/*!40000 ALTER TABLE `detalles_empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresas` (
  `id_empresa` int NOT NULL AUTO_INCREMENT,
  `nombre_empresa` varchar(50) NOT NULL,
  `nit_empresa` varchar(11) NOT NULL,
  `correo_empresa` varchar(60) NOT NULL,
  `id_detalle_empresa` int NOT NULL,
  PRIMARY KEY (`id_empresa`),
  KEY `empresas_ibfk_1` (`id_detalle_empresa`),
  CONSTRAINT `empresas_ibfk_1` FOREIGN KEY (`id_detalle_empresa`) REFERENCES `detalles_empresas` (`id_detalle_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,'Mi Empresa CO','5-31084956','miempresa@colombia.com',1);
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
  `numero_ficha` varchar(50) NOT NULL,
  `nombre_programa_formación` varchar(100) NOT NULL,
  `fecha_inicio_lectiva` date NOT NULL,
  `fecha_fin_lectiva` date NOT NULL,
  `fecha_inicio_practica` date NOT NULL,
  `fecha_fin_practica` date NOT NULL,
  `nivel_programa_formación` varchar(50) NOT NULL,
  `id_instructor_lider_formacion` int NOT NULL,
  `id_instructor_practicas_formacion` int DEFAULT NULL,
  PRIMARY KEY (`id_ficha`),
  KEY `fichas_ibfk_1` (`id_instructor_lider_formacion`),
  KEY `fichas_ibfk_2` (`id_instructor_practicas_formacion`),
  CONSTRAINT `fichas_ibfk_1` FOREIGN KEY (`id_instructor_lider_formacion`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `fichas_ibfk_2` FOREIGN KEY (`id_instructor_practicas_formacion`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichas`
--

LOCK TABLES `fichas` WRITE;
/*!40000 ALTER TABLE `fichas` DISABLE KEYS */;
INSERT INTO `fichas` VALUES (2,'2473196','ADSO','2022-02-01','2023-04-05','2023-04-06','2023-11-02','Tecnologo',1,1);
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
  `id_modalidad_inscripcion` int NOT NULL,
  `nombres_inscripcion` varchar(50) NOT NULL,
  `apellidos_inscripcion` varchar(45) NOT NULL,
  `tipo_documento_inscripcion` varchar(10) NOT NULL,
  `numero_documento_inscripcion` varchar(20) NOT NULL,
  `correo_electronico_inscripcion` varchar(60) NOT NULL,
  `numero_celular_inscripcion` varchar(15) NOT NULL,
  `etapa_formacion_actual_inscripcion` varchar(20) NOT NULL,
  `nivel_formacion_actual_inscripcion` varchar(20) NOT NULL,
  `id_ficha_inscripcion` int NOT NULL,
  `id_instructor_lider_inscripcion` int NOT NULL,
  `apoyo_sostenimiento_inscripcion` varchar(50) NOT NULL,
  `id_empresa_inscripcion` int DEFAULT NULL,
  `nombre_completo_jefe_inmediato_inscripcion` varchar(100) DEFAULT NULL,
  `cargo_jefe_inmediato_inscripcion` varchar(100) DEFAULT NULL,
  `telefono_jefe_inmediato_inscripcion` varchar(100) DEFAULT NULL,
  `correo_jefe_inmediato_inscripcion` varchar(100) DEFAULT NULL,
  `asume_pago_arl_inscripcion` varchar(20) DEFAULT NULL,
  `link_documentos_pdf_inscripcion` varchar(20) NOT NULL,
  `observaciones_inscripcion` varchar(200) NOT NULL,
  `fecha_creacion_inscripcion` date NOT NULL,
  `id_usuario_responsable_inscripcion` int NOT NULL,
  PRIMARY KEY (`id_inscripcion`),
  KEY `inscripciones_ibfk_1` (`id_modalidad_inscripcion`),
  KEY `inscripciones_ibfk_2` (`id_ficha_inscripcion`),
  KEY `inscripciones_ibfk_3` (`id_instructor_lider_inscripcion`),
  KEY `inscripciones_ibfk_4` (`id_empresa_inscripcion`),
  KEY `inscripciones_ibfk_5` (`id_usuario_responsable_inscripcion`),
  CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`id_modalidad_inscripcion`) REFERENCES `modalidades_etapa_practica` (`id_modalidad_practica`),
  CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`id_ficha_inscripcion`) REFERENCES `fichas` (`id_ficha`),
  CONSTRAINT `inscripciones_ibfk_3` FOREIGN KEY (`id_instructor_lider_inscripcion`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `inscripciones_ibfk_4` FOREIGN KEY (`id_empresa_inscripcion`) REFERENCES `empresas` (`id_empresa`),
  CONSTRAINT `inscripciones_ibfk_5` FOREIGN KEY (`id_usuario_responsable_inscripcion`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripciones`
--

LOCK TABLES `inscripciones` WRITE;
/*!40000 ALTER TABLE `inscripciones` DISABLE KEYS */;
INSERT INTO `inscripciones` VALUES (5,2,'Juangui','Gomez','C.C','1027800913','jggomez016@gmail.com','3195810996','Tecnologo','Tecnologo',2,1,'Ninguno',1,'Richard','Presidente','3006953395','rabs@gmail.com','La Empresa','www.youtube.com','N/A','2023-06-20',1);
/*!40000 ALTER TABLE `inscripciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localidades`
--

DROP TABLE IF EXISTS `localidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localidades` (
  `id_localidad` int NOT NULL AUTO_INCREMENT,
  `nombre_localidad` varchar(60) NOT NULL,
  `region_localidad` varchar(60) NOT NULL,
  PRIMARY KEY (`id_localidad`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localidades`
--

LOCK TABLES `localidades` WRITE;
/*!40000 ALTER TABLE `localidades` DISABLE KEYS */;
INSERT INTO `localidades` VALUES (1,'Medellín','Antioquía'),(2,'Medellin','Antioquia');
/*!40000 ALTER TABLE `localidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modalidades_etapa_practica`
--

DROP TABLE IF EXISTS `modalidades_etapa_practica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modalidades_etapa_practica` (
  `id_modalidad_practica` int NOT NULL AUTO_INCREMENT,
  `nombre_modalidad_practica` varchar(50) NOT NULL,
  `num_horas_minimas_modalidad_practica` int DEFAULT NULL,
  `num_horas_maximas_modalidad_practica` int DEFAULT NULL,
  PRIMARY KEY (`id_modalidad_practica`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modalidades_etapa_practica`
--

LOCK TABLES `modalidades_etapa_practica` WRITE;
/*!40000 ALTER TABLE `modalidades_etapa_practica` DISABLE KEYS */;
INSERT INTO `modalidades_etapa_practica` VALUES (1,'Pasantías',1,230),(2,'Contrato de aprendizaje',1,230),(3,'Proyecto Productivo',1,230),(4,'Monitorias',1,230),(5,'Vinculación Laboral',1,230);
/*!40000 ALTER TABLE `modalidades_etapa_practica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador'),(2,'Instructor'),(3,'Aprendiz');
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
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `tipo_documento` varchar(10) NOT NULL,
  `num_documento` varchar(20) NOT NULL,
  `correo_electronico` varchar(60) NOT NULL,
  `num_celular` varchar(15) DEFAULT NULL,
  `contrasena` varchar(300) DEFAULT NULL,
  `id_rol` int NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `Num_Documento_UNIQUE` (`num_documento`),
  UNIQUE KEY `Correo_electronico_UNIQUE` (`correo_electronico`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Stiven','Blandón Urrego','cc','1017924888','blandon0207s@gmail.com','3183577499','$2b$12$HnwbFzxlrw6kI0GHB/2mU.JjNmmmdTI3FmltAX5l67aToC9ZxfO5u',1),(2,'Stiven','Blandón','ti','1017924777','eyconan19@gmail.com','3163026614','$2b$10$KH33PJSnlKiUeCz4vHJfXO8gofC0A11OKhITHWnIJwxBcV/B2qni6',1),(4,'Stiven','Blandón','ti','1017924666','eyconan18@gmail.com','3163026613','$2b$10$zqBCPi./LoqpgCgNZVxSkuKsz3uYP6r75yGfOQL9fsUF1zew.bkDK',1),(6,'Juan','Gomez','CC','1027800913','juanlestar0408@gmail.com','3006953395','$2b$10$nhOaLbTIEVE7TYcsW3NtouwcpHxtSuAjnmdl.9LXaISRfYoo2uP36',2),(7,'Roberto','Gui','TI','1027827666','juanlestar12@gmail.com','3195813232','$2b$10$wcmZBKO13VCPaxSZssWyduSRUMIYdq0E0HQcezbH04C/s5MC0d9C.',2),(8,'Felipe','Benjumea','CC','1027827777','juanlestar13@gmail.com','3195810996','$2b$10$JNhXrq43Av3bzNSptQ85J.5NxKLwPu7CezFzx8n4fTaDXrZdMOZCu',3),(9,'Guillermo','Morales','CC','1027826666','juanlestar14@gmail.com','3195810997','$2b$10$xQ8AhXQIBHURm5b3TdxgEOmVWtUfHTE2Huf5tIoELgGup4L0fHIBu',3);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-22 18:52:31
