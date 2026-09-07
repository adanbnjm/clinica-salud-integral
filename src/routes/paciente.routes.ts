import { Router } from "express";

import {
  createPatientController,
  getAllPatientsController,
  getPatientByIdController,
} from "../controllers/paciente.controller.js";

import { validarPaciente } from "../middlewares/validar-paciente.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.post(
  "/",
  /*
    #swagger.auto = false
    #swagger.tags = ['Pacientes']
    #swagger.summary = 'Crear un paciente'
    #swagger.description = 'Registra un nuevo paciente en la clínica.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        nombre: 'Juan',
        apellidoPaterno: 'Pérez',
        apellidoMaterno: 'Gómez',
        ci: '12345678',
        email: 'juan@gmail.com',
        telefono: '70000000',
        direccion: 'Santa Cruz',
        fechaNacimiento: '1995-05-20'
      }
    }
    #swagger.responses[201] = {
      description: 'Paciente creado correctamente'
    }
    #swagger.responses[400] = {
      description: 'Datos del paciente inválidos'
    }
    #swagger.responses[401] = {
      description: 'Token no proporcionado o inválido'
    }
    #swagger.responses[403] = {
      description: 'No tienes permiso para acceder a este recurso'
    }
  */
  verifyToken,
  authorize("RECEPCIONISTA"),
  validarPaciente,
  createPatientController,
);

router.get(
  "/",
  /*
    #swagger.auto = false
    #swagger.tags = ['Pacientes']
    #swagger.summary = 'Obtener todos los pacientes'
    #swagger.description = 'Obtiene la lista de todos los pacientes.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      description: 'Lista de pacientes'
    }
    #swagger.responses[401] = {
      description: 'Token no proporcionado o inválido'
    }
    #swagger.responses[403] = {
      description: 'No tienes permiso para acceder a este recurso'
    }
  */
  verifyToken,
  authorize("RECEPCIONISTA"),
  getAllPatientsController,
);

router.get(
  "/:id",
  /*
    #swagger.auto = false
    #swagger.tags = ['Pacientes']
    #swagger.summary = 'Obtener paciente por ID'
    #swagger.description = 'Obtiene un paciente específico junto con su historial de citas.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del paciente'
    }
    #swagger.responses[200] = {
      description: 'Paciente encontrado con su historial'
    }
    #swagger.responses[400] = {
      description: 'El ID debe ser un número entero'
    }
    #swagger.responses[401] = {
      description: 'Token no proporcionado o inválido'
    }
    #swagger.responses[403] = {
      description: 'No tienes permiso para acceder a este recurso'
    }
    #swagger.responses[404] = {
      description: 'Paciente no encontrado'
    }
  */
  verifyToken,
  authorize("RECEPCIONISTA"),
  getPatientByIdController,
);

export default router;
