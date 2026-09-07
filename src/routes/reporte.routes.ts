import { Router } from "express";

import {
  obtenerCitasPorEspecialidadController,
  obtenerCorteDiarioController,
} from "../controllers/reporte.controller.js";

import { validarFechaReporte } from "../middlewares/validar-reporte.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.get(
  "/appointments-by-specialty",
  /*
    #swagger.auto = false
    #swagger.tags = ['Reportes']
    #swagger.summary = 'Obtener citas por especialidad'
    #swagger.description = 'Obtiene el volumen total de citas agrupado por especialidad.'
    #swagger.security = [{ "bearerAuth": [] }]

    #swagger.responses[200] = {
      description: 'Reporte de citas agrupadas por especialidad'
    }

    #swagger.responses[401] = {
      description: 'Token no proporcionado o inválido'
    }

    #swagger.responses[403] = {
      description: 'No tienes permiso para acceder a este recurso'
    }
  */
  verifyToken,
  authorize("GERENCIA"),
  obtenerCitasPorEspecialidadController,
);

router.get(
  "/daily-cutoff",
  /*
    #swagger.auto = false
    #swagger.tags = ['Reportes']
    #swagger.summary = 'Obtener corte operativo diario'
    #swagger.description = 'Obtiene la cantidad de citas completadas y canceladas para una fecha.'
    #swagger.security = [{ "bearerAuth": [] }]

    #swagger.parameters['date'] = {
      in: 'query',
      required: true,
      type: 'string',
      format: 'date',
      description: 'Fecha del reporte en formato YYYY-MM-DD',
      example: '2026-09-06'
    }

    #swagger.responses[200] = {
      description: 'Corte operativo diario'
    }

    #swagger.responses[400] = {
      description: 'Fecha inválida'
    }

    #swagger.responses[401] = {
      description: 'Token no proporcionado o inválido'
    }

    #swagger.responses[403] = {
      description: 'No tienes permiso para acceder a este recurso'
    }
  */
  verifyToken,
  authorize("GERENCIA"),
  validarFechaReporte,
  obtenerCorteDiarioController,
);

export default router;
