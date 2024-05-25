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
      'SELECT aprendices_bitacoras_detalles.id_aprendiz, aprendices_bitacoras.id_bitacora, aprendices_bitacoras.calificacion_bitacora, aprendices_bitacoras.observaciones_bitacora, aprendices_bitacoras.numero_bitacora, DATE_FORMAT(aprendices_bitacoras.fecha_modificacion, "%Y-%m-%d %H:%i:%s") as fecha_modificacion FROM aprendices_bitacoras_detalles INNER JOIN aprendices_bitacoras ON aprendices_bitacoras.id_bitacora = aprendices_bitacoras_detalles.id_aprendiz_bitacora_detalle WHERE aprendices_bitacoras_detalles.id_aprendiz = ?',
      [id]
    );
    if (query.length === 0)
      throw new DbError("No existen bitácoras para este aprendiz");
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
          u_instructor.nombres_usuario AS nombre_instructor,  
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
  const { calificacion_bitacora, observaciones_bitacora, usuario_responsable } =
    req.body;
  const { id } = req.params;
  try {
    const [query] = await connection.query<ResultSetHeader>(
      "UPDATE aprendices_bitacoras SET calificacion_bitacora = IFNULL(?, calificacion_bitacora), observaciones_bitacora = IFNULL(?, observaciones_bitacora), usuario_responsable = IFNULL(?, usuario_responsable) WHERE id_bitacora = ?",
      [calificacion_bitacora, observaciones_bitacora, usuario_responsable, id]
    );
    if (query.affectedRows === 0)
      throw new DbError("Error al modificar los datos de la bitácora");
    return res.status(httpStatus.OK).json(query);
  } catch (error) {
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
  } = req.body;
  const { id } = req.params;
  try {
    const [query] = await connection.query<ResultSetHeader>(
      "UPDATE aprendices_visitas SET numero_visita = IFNULL(?, numero_visita), estado_visita = IFNULL(?, estado_visita), observaciones_visita = IFNULL(?, observaciones_visita), usuario_responsable = IFNULL(?, usuario_responsable), instructor = IFNULL(?, instructor) WHERE id_visita = ?",
      [
        numero_visita,
        estado_visita,
        observaciones_visita,
        usuario_responsable,
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
  } = req.body as visitForm;
  try {
    await connection.query(
      "call sena_practicas.subir_visita_con_detalles(?, ?, ?, ?)",
      [id_aprendiz, estado_visita, observaciones_visita, usuario_responsable]
    );
    return res
      .status(httpStatus.OK)
      .json({ message: "Visita creada con éxito" });
  } catch (error) {
    return handleHTTP(res, error as CustomError);
  }
};
