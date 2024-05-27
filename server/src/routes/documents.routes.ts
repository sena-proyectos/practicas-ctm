import { type IRouter, Router } from "express";
import {
  excelGeneratorClass,
  excelGeneratorStudents,
  excelGeneratorStudentsCategory,
  excelGeneratorStudentsInstructor,
  excelGeneratorStudentsNoPractical,
  excelGeneratorStudentsPractical,
  excelGeneratorFichasByInstructor,
  excelGeneratorStudentsInPracticsByInstructor,
} from "../controllers/documents.controllers.js";
import { checkClassNumber } from "../middlewares/classes.middlewares.js";
import {
  checkInstructor,
  checkModality,
} from "../middlewares/documents.middlewares.js";

const documentRoutes: IRouter = Router();

/**
 * Genera un archivo de Excel relacionado con las clases.
 * @route GET /create-excel-class
 * @param {string} request.query.numero_ficha
 * @returns {Promise<Buffer>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
documentRoutes.get(
  "/v1/create-excel-class",
  checkClassNumber,
  excelGeneratorClass
);

/**
 * Genera un archivo de Excel de todos los estudiantes.
 * @route GET /create-excel-students
 * @returns {Promise<Buffer>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
documentRoutes.get("/v1/create-excel-students", excelGeneratorStudents);

/**
 * Genera un archivo de Excel relacionado con los estudiantes en prácticas.
 * @route GET /create-excel-students-practical
 * @returns {Promise<Buffer>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
documentRoutes.get(
  "/v1/create-excel-students-practical",
  excelGeneratorStudentsPractical
);

/**
 * Genera un archivo de Excel relacionado con los estudiantes sin prácticas.
 * @route GET /create-excel-students-nopractical
 * @returns {Promise<Buffer>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
documentRoutes.get(
  "/v1/create-excel-students-nopractical",
  excelGeneratorStudentsNoPractical
);

/**
 * Genera un archivo de Excel relacionado con los estudiantes por modalidad de practicas.
 * @route GET /create-excel-students-category
 * @param {string} request.query.modality
 * @returns {Promise<Buffer>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
documentRoutes.get(
  "/v1/create-excel-students-category",
  checkModality,
  excelGeneratorStudentsCategory
);

/**
 * Genera un archivo de Excel relacionado con los estudiantes por instructor.
 * @route GET /create-excel-students-instructor
 * @param {string} request.query.instructor
 * @returns {Promise<Buffer>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
documentRoutes.get(
  "/v1/create-excel-students-instructor",
  checkInstructor,
  excelGeneratorStudentsInstructor
);

/**
 * Genera un archivo de Excel relacionado con los estudiantes por instructor.
 * @route GET /create-excel-students-instructor
 * @param {string} request.query.instructor
 * @returns {Promise<Buffer>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
documentRoutes.get(
  "/v1/create-excel-ficha-instructor",
  checkInstructor,
  excelGeneratorFichasByInstructor
);

/**
 * Genera un archivo de Excel relacionado con los estudiantes por instructor.
 * @route GET /create-excel-students-instructor
 * @param {string} request.query.instructor
 * @returns {Promise<Buffer>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
documentRoutes.get(
  "/v1/create-excel-students-practics",
  checkInstructor,
  excelGeneratorStudentsInPracticsByInstructor
);

export { documentRoutes };
