import { type Request, type Response } from "express";
import { connection } from "../config/db.js";
import { type ResultSetHeader, type RowDataPacket } from "mysql2";
import { type CustomError, DbError } from "../errors/customErrors.js";
import { handleHTTP } from "../errors/errorsHandler.js";
import { httpStatus } from "../models/httpStatus.enums.js";
import { visitForm } from "../interfaces/trackingStudent.interfaces.js";

export const getLettersByStudent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const [query] = await connection.query<RowDataPacket[]>(
      'SELECT aprendices_cartas_detalles.id_carta_aprendiz, aprendices_cartas.tipo_carta_aprendiz as tipo_carta, aprendices_cartas.estado_carta_aprendiz as estado_carta, aprendices_cartas.observaciones, DATE_FORMAT(fecha_modificacion, "%Y-%m-%d %H:%i:%s") AS fecha_modificacion FROM aprendices_cartas_detalles INNER JOIN aprendices_cartas ON aprendices_cartas.id_carta_aprendiz = aprendices_cartas_detalles.id_carta_aprendiz WHERE aprendices_cartas_detalles.id_aprendiz = ?',
      [id]
    );
    if (query.length === 0)
      throw new DbError("No existe cartas para este aprendiz");
    return res.status(httpStatus.OK).json(query);
  } catch (error) {
    return handleHTTP(res, error as CustomError);
  }
};

export const getBitacorasByStudent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const [query] = await connection.query<RowDataPacket[]>(
      `SELECT 
    detalles.id_aprendiz, 
    bitacoras.id_bitacora, 
    bitacoras.calificacion_bitacora, 
    bitacoras.observaciones_bitacora, 
    bitacoras.numero_bitacora, 
    DATE_FORMAT(bitacoras.fecha_modificacion, "%Y-%m-%d %H:%i:%s") as fecha_modificacion, 
    DATE_FORMAT(bitacoras.fecha_entrega, "%Y-%m-%d") as fecha_entrega
FROM 
    aprendices_bitacoras_detalles as detalles
INNER JOIN 
    aprendices_bitacoras as bitacoras
ON 
    bitacoras.id_bitacora = detalles.id_bitacora
WHERE 
    detalles.id_aprendiz = ?;`,
      [id]
    );

    if (query.length === 0) {
      throw new DbError("No existen bitácoras para este aprendiz");
    }

    return res.status(httpStatus.OK).json(query);
  } catch (error) {
    return handleHTTP(res, error as CustomError);
  }
};
export const getVisitsByStudent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const [query] = await connection.query<RowDataPacket[]>(
      `SELECT 
      ad.id_aprendiz, 
      av.id_visita, 
      av.numero_visita, 
      av.estado_visita, 
      av.observaciones_visita, 
      av.usuario_responsable, 
      DATE_FORMAT(av.visita_hora, "%Y-%m-%d") AS visita_hora,
      CONCAT(u_instructor.nombres_usuario, ' ', u_instructor.apellidos_usuario) AS nombre_instructor,  
      DATE_FORMAT(av.fecha_modificacion, "%Y-%m-%d %H:%i:%s") AS fecha_modificacion 
  FROM 
      aprendices_visitas_detalles ad 
  INNER JOIN 
      aprendices_visitas av ON ad.id_visita = av.id_visita 
  LEFT JOIN 
      usuarios u_instructor ON av.instructor = u_instructor.id_usuario  
  WHERE 
      ad.id_aprendiz = ?`,
      [id]
    );
    if (query.length === 0)
      throw new DbError("Hubo un error al traer los datos");
    return res.status(httpStatus.OK).json(query);
  } catch (error) {
    return handleHTTP(res, error as CustomError);
  }
};

export const modifyLetterByID = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    tipo_carta_aprendiz,
    estado_carta_aprendiz,
    observaciones,
    usuario_responsable,
  } = req.body;
  const { id } = req.params;
  try {
    const [query] = await connection.query<ResultSetHeader>(
      "UPDATE aprendices_cartas SET tipo_carta_aprendiz = IFNULL(?, tipo_carta_aprendiz), estado_carta_aprendiz = IFNULL(?, estado_carta_aprendiz), observaciones = IFNULL(?, observaciones), usuario_responsable = IFNULL(?, usuario_responsable) WHERE id_carta_aprendiz = ?",
      [
        tipo_carta_aprendiz,
        estado_carta_aprendiz,
        observaciones,
        usuario_responsable,
        id,
      ]
    );
    if (query.affectedRows === 0)
      throw new DbError("Error al modificar los datos de la carta");
    return res.status(httpStatus.OK).json(query);
  } catch (error) {
    return handleHTTP(res, error as CustomError);
  }
};

export const modifyBitacoraById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    calificacion_bitacora,
    observaciones_bitacora,
    usuario_responsable,
    fecha_entrega,
  } = req.body;
  const { id } = req.params;

  console.log("Datos recibidos en el backend:", {
    calificacion_bitacora,
    observaciones_bitacora,
    usuario_responsable,
    fecha_entrega,
  });

  try {
    const [query] = await connection.query<ResultSetHeader>(
      `UPDATE aprendices_bitacoras SET 
         calificacion_bitacora = IFNULL(?, calificacion_bitacora), 
         observaciones_bitacora = IFNULL(?, observaciones_bitacora), 
         usuario_responsable = IFNULL(?, usuario_responsable), 
         fecha_entrega = IFNULL(?, fecha_entrega) 
       WHERE id_bitacora = ?`,
      [
        calificacion_bitacora,
        observaciones_bitacora,
        usuario_responsable,
        fecha_entrega,
        id,
      ]
    );

    console.log("Resultado de la consulta:", query);

    if (query.affectedRows === 0) {
      throw new DbError("Error al modificar los datos de la bitácora");
    }

    return res.status(httpStatus.OK).json(query);
  } catch (error) {
    console.error("Error al modificar la bitácora:", error);
    return handleHTTP(res, error as CustomError);
  }
};

export const modifyVisitByID = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    numero_visita,
    estado_visita,
    observaciones_visita,
    usuario_responsable,
    instructor,
    visita_hora, // Actualizamos para incluir la nueva columna visita_hora
  } = req.body;
  const { id } = req.params;
  try {
    const [query] = await connection.query<ResultSetHeader>(
      "UPDATE aprendices_visitas SET numero_visita = IFNULL(?, numero_visita), estado_visita = IFNULL(?, estado_visita), observaciones_visita = IFNULL(?, observaciones_visita), usuario_responsable = IFNULL(?, usuario_responsable), visita_hora = ?, instructor = IFNULL(?, instructor) WHERE id_visita = ?",
      [
        numero_visita,
        estado_visita,
        observaciones_visita,
        usuario_responsable,
        visita_hora, // Usamos la nueva columna visita_hora en lugar de fecha_modificacion
        instructor,
        id,
      ]
    );
    if (query.affectedRows === 0)
      throw new DbError("Error al modificar los datos de la visita");
    return res.status(httpStatus.OK).json(query);
  } catch (error) {
    return handleHTTP(res, error as CustomError);
  }
};

export const createVisit = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    id_aprendiz,
    estado_visita,
    observaciones_visita,
    usuario_responsable,
  } = req.body;
  try {
    await connection.query("CALL subir_visita_con_detalles(?, ?, ?, ?)", [
      id_aprendiz,
      estado_visita,
      observaciones_visita,
      usuario_responsable,
    ]);
    return res
      .status(httpStatus.OK)
      .json({ message: "Visita creada con éxito" });
  } catch (error) {
    return handleHTTP(res, error as CustomError);
  }
};

export const checkPendingVisits = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const [query] = await connection.query<RowDataPacket[]>(
      ` SELECT 
    av.id_visita, 
    av.numero_visita, 
    av.estado_visita, 
    av.observaciones_visita, 
    av.usuario_responsable, 
    DATE_FORMAT(av.visita_hora, "%Y-%m-%d") AS visita_hora,
    CONCAT(u_instructor.nombres_usuario, ' ', u_instructor.apellidos_usuario) AS nombre_instructor,  
    DATE_FORMAT(av.fecha_modificacion, "%Y-%m-%d %H:%i:%s") AS fecha_modificacion,
    CONCAT(a.nombre_aprendiz, ' ', a.apellido_aprendiz) AS nombre_aprendiz,
    DATE_FORMAT(f.fecha_inicio_practica, "%Y-%m-%d") AS fecha_inicio_practica,
    f.numero_ficha -- Aquí se agrega la columna del número de la ficha
FROM 
    aprendices_visitas av 
LEFT JOIN 
    usuarios u_instructor ON av.instructor = u_instructor.id_usuario
LEFT JOIN 
    aprendices_visitas_detalles avd ON av.id_visita = avd.id_visita
LEFT JOIN 
    aprendices a ON avd.id_aprendiz = a.id_aprendiz
LEFT JOIN 
    detalle_fichas_aprendices dfa ON a.id_aprendiz = dfa.id_aprendiz
LEFT JOIN 
    fichas f ON dfa.id_ficha = f.id_ficha
WHERE 
    av.estado_visita = 'Pendiente' AND 
    f.fecha_inicio_practica IS NOT NULL AND
    DATE_ADD(f.fecha_inicio_practica, INTERVAL 30 DAY) < NOW();
 `
    );
    return res.status(httpStatus.OK).json(query);
  } catch (error) {
    console.error("Error al obtener las visitas pendientes:", error);
    throw error;
  }
};

export const notificationVisitInstructor = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = Number(req.params.id); // Assuming userId is passed as a URL parameter

  try {
    const [query] = await connection.query<RowDataPacket[]>(
      `SELECT 
    av.id_visita, 
    av.numero_visita, 
    av.estado_visita, 
    av.observaciones_visita, 
    av.usuario_responsable, 
    DATE_FORMAT(av.visita_hora, "%Y-%m-%d") AS visita_hora,
    CONCAT(u_instructor.nombres_usuario, ' ', u_instructor.apellidos_usuario) AS nombre_instructor,  
    DATE_FORMAT(av.fecha_modificacion, "%Y-%m-%d %H:%i:%s") AS fecha_modificacion,
    CONCAT(a.nombre_aprendiz, ' ', a.apellido_aprendiz) AS nombre_aprendiz,
    DATE_FORMAT(f.fecha_inicio_practica, "%Y-%m-%d") AS fecha_inicio_practica,
    f.numero_ficha -- Aquí se agrega la columna del número de la ficha
FROM 
    aprendices_visitas av 
INNER JOIN 
    usuarios u_instructor ON av.instructor = u_instructor.id_usuario
LEFT JOIN 
    aprendices_visitas_detalles avd ON av.id_visita = avd.id_visita
LEFT JOIN 
    aprendices a ON avd.id_aprendiz = a.id_aprendiz
LEFT JOIN 
    detalle_fichas_aprendices dfa ON a.id_aprendiz = dfa.id_aprendiz
LEFT JOIN 
    fichas f ON dfa.id_ficha = f.id_ficha
WHERE 
    av.estado_visita = 'Pendiente' AND 
    f.fecha_inicio_practica IS NOT NULL AND
    DATE_ADD(f.fecha_inicio_practica, INTERVAL 30 DAY) < NOW() AND
    av.instructor = ?;`,
      [userId]
    );
    res.status(httpStatus.OK).json(query);
  } catch (error) {
    console.error("Error al obtener la notificación de las visitas:", error);
    throw error;
  }
};
