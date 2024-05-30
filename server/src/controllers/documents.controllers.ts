import { type Request, type Response } from "express";
import { handleHTTP } from "../errors/errorsHandler.js";
import { DataNotValid, type CustomError } from "../errors/customErrors.js";
import XLSX from "xlsx";
import { connection } from "../config/db.js";
import { type RowDataPacket } from "mysql2";

const getStudentsByNumberClass = async (classNumber: any): Promise<any> => {
  try {
    const [query] = await connection.query<RowDataPacket[]>(
      "CALL aprendicesPorNumeroFicha(?)",
      [classNumber]
    );
    const data = query[0];
    return data;
  } catch (error) {
    throw new Error();
  }
};

export const excelGeneratorClass = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { numero_ficha } = req.query;
  const date = new Date();
  const fullDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  try {
    const payload = await getStudentsByNumberClass(numero_ficha);
    payload.forEach((student: any) => {
      for (const key in student) {
        const newKey = key.replaceAll("_", " ").toUpperCase();
        student[newKey] = student[key];
        delete student[key];
      }
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(payload);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registros");

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=registros_${numero_ficha}_${fullDate}.xlsx`
    );

    return res.send(buffer);
  } catch (error) {
    return handleHTTP(res, error as CustomError);
  }
};

const getStudents = async (): Promise<any> => {
  try {
    const [query] = await connection.query<RowDataPacket[]>(
      "call sena_practicas.full_info_aprendiz()",
      []
    );
    const data = query[0];
    return data;
  } catch (error) {
    throw new Error();
  }
};

export const excelGeneratorStudents = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const date = new Date();
  const fullDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  try {
    const payload = await getStudents();
    payload.forEach((student: any) => {
      for (const key in student) {
        const newKey = key.replaceAll("_", " ").toUpperCase();
        student[newKey] = student[key];
        delete student[key];
      }
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(payload);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Estudiantes");

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=estudiantes_${fullDate}.xlsx`
    );

    return res.send(buffer);
  } catch (error) {
    return handleHTTP(res, error as CustomError);
  }
};

const getStudentsPractical = async (): Promise<any> => {
  try {
    const [query] = await connection.query<RowDataPacket[]>(
      "call sena_practicas.conseguir_aprendices_en_practica()",
      []
    );
    const data = query[0];
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const excelGeneratorStudentsPractical = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const date = new Date();
  const fullDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  try {
    const payload = await getStudentsPractical();
    payload.forEach((student: any) => {
      for (const key in student) {
        const newKey = key.replaceAll("_", " ").toUpperCase();
        student[newKey] = student[key];
        delete student[key];
      }
    });
    const worksheet = XLSX.utils.json_to_sheet(payload);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Estudiantes en practicas"
    );
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=estudiantesEnPracticas_${fullDate}.xlsx`
    );
    return res.send(buffer);
  } catch (error) {
    return handleHTTP(res, error as CustomError);
  }
};

const getStudentsWithNoPractical = async (): Promise<any> => {
  try {
    const [query] = await connection.query<RowDataPacket[]>(
      "call sena_practicas.alerta_bisemanal()",
      []
    );
    const data = query[0];
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const excelGeneratorStudentsNoPractical = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const date = new Date();
  const fullDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  try {
    const payload = await getStudentsWithNoPractical();
    payload.forEach((student: any) => {
      for (const key in student) {
        const newKey = key.replaceAll("_", " ").toUpperCase();
        student[newKey] = student[key];
        delete student[key];
      }
    });
    const worksheet = XLSX.utils.json_to_sheet(payload);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Estudiantes sin practicas"
    );
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=estudiantesNoPractica_${fullDate}.xlsx`
    );
    return res.send(buffer);
  } catch (error) {
    return handleHTTP(res, error as CustomError);
  }
};

const getStudentsByCategory = async (modality: string): Promise<any> => {
  try {
    const [query] = await connection.query<RowDataPacket[]>(
      "call sena_practicas.conseguir_aprendices_por_modalidad(?)",
      [modality]
    );
    const data = query[0];
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const excelGeneratorStudentsCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { modality } = req.query;
  const date = new Date();
  const fullDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  try {
    if (typeof modality !== "string")
      throw new DataNotValid("Error con el query");
    const payload = await getStudentsByCategory(modality);
    payload.forEach((student: any) => {
      for (const key in student) {
        const newKey = key.replaceAll("_", " ").toUpperCase();
        student[newKey] = student[key];
        delete student[key];
      }
    });
    const worksheet = XLSX.utils.json_to_sheet(payload);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1");
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=estudiantes_${modality}_${fullDate}.xlsx`
    );
    return res.send(buffer);
  } catch (error) {
    return handleHTTP(res, error as CustomError);
  }
};

const getStudentsByInstructor = async (instructor: string): Promise<any> => {
  try {
    const [query] = await connection.query<RowDataPacket[]>(
      "call sena_practicas.conseguir_aprendices_por_instructor(?)",
      [instructor]
    );
    const data = query[0];
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const excelGeneratorStudentsInstructor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { instructor } = req.query;
  const date = new Date();
  const fullDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  try {
    if (typeof instructor !== "string")
      throw new DataNotValid("Error con el query");
    const payload = await getStudentsByInstructor(instructor);
    payload.forEach((student: any) => {
      for (const key in student) {
        const newKey = key.replaceAll("_", " ").toUpperCase();
        student[newKey] = student[key];
        delete student[key];
      }
    });
    const worksheet = XLSX.utils.json_to_sheet(payload);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1");
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=estudiantes${instructor}_${fullDate}.xlsx`
    );
    return res.send(buffer);
  } catch (error) {
    return handleHTTP(res, error as CustomError);
  }
};

const getFichasByInstructor = async (instructor: string): Promise<any> => {
  try {
    const [query] = await connection.query<RowDataPacket[]>(
      "CALL obtener_cantidad_fichas_por_instructor(?)",
      [instructor]
    );
    const data = query[0];
    return data;
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw new Error("Error en la consulta a la base de datos");
  }
};

// Función para generar y enviar el archivo Excel
export const excelGeneratorFichasByInstructor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { instructor } = req.query;
  const date = new Date();
  const fullDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  try {
    if (typeof instructor !== "string")
      throw new DataNotValid("Error con el query");
    const payload = await getFichasByInstructor(instructor);
    payload.forEach((student: any) => {
      for (const key in student) {
        const newKey = key.replaceAll("_", " ").toUpperCase();
        student[newKey] = student[key];
        delete student[key];
      }
    });
    const worksheet = XLSX.utils.json_to_sheet(payload);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1");
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=estudiantes${instructor}_${fullDate}.xlsx`
    );
    return res.send(buffer);
  } catch (error) {
    return handleHTTP(res, error as CustomError);
  }
};

const getStudentsInPractisByInstructor = async (
  instructor: string
): Promise<any> => {
  try {
    const [query] = await connection.query<RowDataPacket[]>(
      "CALL TotalAprendicesEnPracticas(?)",
      [instructor]
    );
    const data = query[0];
    return data;
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw new Error("Error en la consulta a la base de datos");
  }
};

export const excelGeneratorStudentsInPracticsByInstructor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { instructor } = req.query;
  const date = new Date();
  const fullDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  try {
    if (typeof instructor !== "string")
      throw new DataNotValid("Error con el query");
    const payload = await getStudentsInPractisByInstructor(instructor);
    payload.forEach((student: any) => {
      for (const key in student) {
        const newKey = key.replaceAll("_", " ").toUpperCase();
        student[newKey] = student[key];
        delete student[key];
      }
    });
    const worksheet = XLSX.utils.json_to_sheet(payload);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1");
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=estudiantes_con_practicas${instructor}_${fullDate}.xlsx`
    );
    return res.send(buffer);
  } catch (error) {
    return handleHTTP(res, error as CustomError);
  }
};
