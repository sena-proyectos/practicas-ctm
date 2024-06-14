CREATE DATABASE  IF NOT EXISTS `sena_practicas2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sena_practicas2`;
-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: sena_practicas2
-- ------------------------------------------------------
-- Server version	8.0.37-0ubuntu0.24.04.1

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
) ENGINE=InnoDB AUTO_INCREMENT=443 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=5042 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=5042 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=853 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=849 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=787 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=785 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=225 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=264 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=546 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=929 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=259 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=233 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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

-- Dump completed on 2024-06-14 14:15:16
