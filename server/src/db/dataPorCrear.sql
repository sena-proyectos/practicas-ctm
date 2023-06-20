create table inscripciones
(
`id_inscripcion` int not null auto_increment,
`nombres_aprendiz_inscripcion` varchar(50) not null,
`apellidos_aprendiz_inscripcion` varchar(45) not null,
`tipo_documento_aprendiz_inscripcion` varchar(10) not null,
`numero_documento_aprendiz_inscripcion` varchar(20) not null,
`correo_electronico_aprendiz_inscripcion` varchar(60) not null,
`numero_telefono_aprendiz_inscripcion` varchar(15) not null,
`inicio_etapa_practica_aprendiz_inscripcion` date not null,
`fin_etapa_practica_aprendiz_inscripcion` date not null,
`fecha_creacion_aprendiz_inscripcion` date not null,
`id_ficha_aprendiz_inscripcion` varchar(30) not null,
`id_usuario_responsable_inscripcion` varchar(100) not null,
primary key (`id_inscripcion`),
CONSTRAINT `inscripciones_ibfk_1` foreign key (`id_usuario_responsable_inscripcion`) references `usuarios`(`id_usuario`),
CONSTRAINT `inscripciones_ibfk_2` foreign key (`id_ficha_aprendiz_inscripcion`) references `fichas`(`id_ficha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

create table fichas
(
`id_ficha` int not null auto_increment,
`numero_ficha` varchar(50) not null,
`nombre_programa_formación` varchar(100) not null,
`fecha_inicio_lectiva` date not null,
`fecha_fin_lectiva` date not null,
`fecha_inicio_practica` date not null,
`fecha_fin_practica` date not null,
`nivel_programa_formación` varchar(50) not null,
`nombre_instructor_lider_formacion` varchar(50) not null,
`nombre_instructor_practicas_formacion` varchar(50),
primary key (`id_ficha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

create table instructores
(
`id_instructor` int not null auto_increment,
`correo_institucional_instructor` varchar(60),
`id_usuario` varchar(50) not null,
primary key (`id_inscripcion`),
foreign key (`id_usuario`) references `usuarios`(`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;