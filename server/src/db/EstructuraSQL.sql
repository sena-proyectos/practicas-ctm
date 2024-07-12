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
) ENGINE=InnoDB AUTO_INCREMENT=448 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=5102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=5102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=863 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=859 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=809 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=807 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=226 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=268 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=551 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=263 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-12  9:03:35
