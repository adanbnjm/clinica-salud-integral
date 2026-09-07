import { Router } from "express";

import {
  crearCitaController,
  obtenerAgendaMedicoController,
  actualizarEstadoCitaController,
} from "../controllers/cita.controller.js";

import { validarCita, validarEstadoCita } from "../middlewares/validar-cita.js";

import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.post(
  "/",
  /*
    #swagger.auto = false
    #swagger.tags = ['Citas']
    #swagger.summary = 'Crear una cita'
    #swagger.description = 'Agenda una cita para un paciente con un médico.'
    #swagger.security = [{ "bearerAuth": [] }]

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        pacienteId: 1,
        medicoId: 1,
        fechaHora: '2026-09-15T10:00:00'
      }
    }

    #swagger.responses[201] = {
      description: 'Cita creada correctamente'
    }

    #swagger.responses[400] = {
      description: 'Datos inválidos o fecha pasada'
    }

    #swagger.responses[401] = {
      description: 'Token no proporcionado o inválido'
    }

    #swagger.responses[403] = {
      description: 'No tienes permiso para acceder a este recurso'
    }

    #swagger.responses[404] = {
      description: 'Paciente o médico no encontrado'
    }
  */
  verifyToken,
  authorize("RECEPCIONISTA"),
  validarCita,
  crearCitaController,
);

router.get(
  "/medico/:id",
  /*
    #swagger.auto = false
    #swagger.tags = ['Citas']
    #swagger.summary = 'Obtener agenda de un médico'
    #swagger.description = 'Obtiene las citas de un médico y permite filtrarlas por rango de fechas.'
    #swagger.security = [{ "bearerAuth": [] }]

    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del médico'
    }

    #swagger.parameters['from'] = {
      in: 'query',
      required: false,
      type: 'string',
      format: 'date-time',
      description: 'Fecha inicial del rango'
    }

    #swagger.parameters['to'] = {
      in: 'query',
      required: false,
      type: 'string',
      format: 'date-time',
      description: 'Fecha final del rango'
    }

    #swagger.responses[200] = {
      description: 'Agenda del médico'
    }

    #swagger.responses[401] = {
      description: 'Token no proporcionado o inválido'
    }

    #swagger.responses[403] = {
      description: 'No tienes permiso para acceder a este recurso'
    }
  */
  verifyToken,
  authorize("MEDICO"),
  obtenerAgendaMedicoController,
);

router.patch(
  "/:id/estado",
  /*
    #swagger.auto = false
    #swagger.tags = ['Citas']
    #swagger.summary = 'Actualizar estado de una cita'
    #swagger.description = 'Permite al médico marcar una cita como completada o cancelada.'
    #swagger.security = [{ "bearerAuth": [] }]

    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID de la cita'
    }

   #swagger.requestBody = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        required: ["estado"],
        properties: {
          estado: {
            type: "string",
            enum: ["COMPLETADA", "CANCELADA"],
            example: "COMPLETADA"
          }
        }
      }
    }
  }
}

    #swagger.responses[200] = {
      description: 'Estado de la cita actualizado correctamente'
    }

    #swagger.responses[400] = {
      description: 'Estado de cita inválido'
    }

    #swagger.responses[401] = {
      description: 'Token no proporcionado o inválido'
    }

    #swagger.responses[403] = {
      description: 'No tienes permiso para acceder a este recurso'
    }

    #swagger.responses[404] = {
      description: 'Cita no encontrada'
    }
  */
  verifyToken,
  authorize("MEDICO"),
  validarEstadoCita,
  actualizarEstadoCitaController,
);

export default router;
