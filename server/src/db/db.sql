CREATE DATABASE  IF NOT EXISTS `practicas_sena` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `practicas_sena`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: practicas_sena
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
  CONSTRAINT `fichas_ibfk_1` FOREIGN KEY (`id_instructor_lider_formacion`) REFERENCES `instructores` (`id_instructor`),
  CONSTRAINT `fichas_ibfk_2` FOREIGN KEY (`id_instructor_practicas_formacion`) REFERENCES `instructores` (`id_instructor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichas`
--

LOCK TABLES `fichas` WRITE;
/*!40000 ALTER TABLE `fichas` DISABLE KEYS */;
/*!40000 ALTER TABLE `fichas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructores`
--

DROP TABLE IF EXISTS `instructores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructores` (
  `id_instructor` int NOT NULL AUTO_INCREMENT,
  `correo_institucional_instructor` varchar(60) DEFAULT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id_instructor`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `instructores_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructores`
--

LOCK TABLES `instructores` WRITE;
/*!40000 ALTER TABLE `instructores` DISABLE KEYS */;
/*!40000 ALTER TABLE `instructores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modalidades_etapa_practica`
--

DROP TABLE IF EXISTS `modalidades_etapa_practica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modalidades_etapa_practica` (
  `id_modalidad_practica` int NOT NULL AUTO_INCREMENT,
  `tipo_modalidad_practica` varchar(50) NOT NULL,
  `num_horas_minimas_modalidad_practica` int DEFAULT NULL,
  `num_horas_maximas_modalidad_practica` int DEFAULT NULL,
  PRIMARY KEY (`id_modalidad_practica`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modalidades_etapa_practica`
--

LOCK TABLES `modalidades_etapa_practica` WRITE;
/*!40000 ALTER TABLE `modalidades_etapa_practica` DISABLE KEYS */;
INSERT INTO `modalidades_etapa_practica` VALUES (1,'Cesantías',1,230),(2,'Contrato de aprendizaje',1,230),(3,'Emprendimiento',1,230);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Stiven','Blandón Urrego','cc','1017924888','blandon0207s@gmail.com','3183577499','$2b$12$HnwbFzxlrw6kI0GHB/2mU.JjNmmmdTI3FmltAX5l67aToC9ZxfO5u',1),(2,'Stiven','Blandón','ti','1017924777','eyconan19@gmail.com','3163026614','$2b$10$KH33PJSnlKiUeCz4vHJfXO8gofC0A11OKhITHWnIJwxBcV/B2qni6',1),(4,'Stiven','Blandón','ti','1017924666','eyconan18@gmail.com','3163026613','$2b$10$zqBCPi./LoqpgCgNZVxSkuKsz3uYP6r75yGfOQL9fsUF1zew.bkDK',1);
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

-- Dump completed on 2023-06-15 14:51:13
