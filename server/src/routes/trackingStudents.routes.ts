import { type IRouter, Router } from "express";
import { checkIdReq } from "../middlewares/idCheck.middlewares.js";
import {
  createVisit,
  getBitacorasByStudent,
  getLettersByStudent,
  getVisitsByStudent,
  modifyBitacoraById,
  modifyLetterByID,
  modifyVisitByID,
  checkPendingVisits,
} from "../controllers/trackingStudents.controllers.js";
import {
  checkBitacoraData,
  checkLetterData,
  checkVisitData,
  alertVisitaMiddleware,
  checkCreateVisita
} from "../middlewares/trackingStudents.middlewares.js";

const trackingRoute: IRouter = Router();

/**
 * Obtener todas las cartas mediante el ID del aprendiz
 * @route GET /v1/getLetterByStudent/:id
 * @param {string} request.param.id
 * @returns {Promise<Array.<Letter>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
trackingRoute.get(
  "/v1/getLetterByStudent/:id",
  checkIdReq,
  getLettersByStudent
);

/**
 * Obtener todas las bitacoras mediante el ID del aprendiz
 * @route GET /v1/getBitacorasByStudent/:id
 * @param {string} request.param.id
 * @returns {Promise<Array.<Bitacora>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
trackingRoute.get(
  "/v1/getBitacorasByStudent/:id",
  checkIdReq,
  getBitacorasByStudent
);

/**
 * Obtener todas las visitas mediante el ID del aprendiz
 * @route GET /v1/getVisitsByStudent/:id
 * @param {string} request.param.id
 * @returns {Promise<Array.<Visitas>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
trackingRoute.get("/v1/getVisitsByStudent/:id", checkIdReq, getVisitsByStudent);

/**
 * Modificar una carta mediante su ID
 * @route POST /v1/modifyLetter/:id
 * @param {string} request.param.id
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
trackingRoute.patch(
  "/v1/modifyLetter/:id",
  checkIdReq,
  checkLetterData,
  modifyLetterByID
);

/**
 * Modificar una bitacora mediante su ID
 * @route POST /v1/modifyBitacora/:id
 * @param {string} request.param.id
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
trackingRoute.patch(
  "/v1/modifyBitacora/:id",
  checkIdReq,
  checkBitacoraData,
  modifyBitacoraById
);

/**
 * Modificar una bitacora mediante su ID
 * @route POST /v1/modifyVisit/:id
 * @param {string} request.param.id
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
trackingRoute.patch(
  "/v1/modifyVisit/:id",
  checkIdReq,
  checkVisitData,
  modifyVisitByID
);

/**
 * Crear una visita extracurricular
 * @route POST /v1/create-visit
 * @param {visitForm} request.body.numero_visita
 * @param {visitForm} request.body.estado_visita
 * @param {visitForm} request.body.observaciones_visita
 * @param {visitForm} request.body.usuario_responsable
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
trackingRoute.post("/v1/create-visit", checkCreateVisita, createVisit);

/**
 * Ruta para obtener alerta de visitas pendientes
 * @route GET /v1/alertVisita
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
trackingRoute.get("/v1/alertVisita", alertVisitaMiddleware, checkPendingVisits);

export { trackingRoute };
