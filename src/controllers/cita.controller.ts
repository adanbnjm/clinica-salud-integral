import type { Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client.js";

import {
  crearCita,
  obtenerAgendaMedico,
  actualizarEstadoCita,
} from "../models/cita.model.js";

import { getPatientById } from "../models/paciente.model.js";
import { obtenerMedicoPorId } from "../models/medico.model.js";

export async function crearCitaController(req: Request, res: Response) {
  try {
    const { pacienteId, medicoId, fechaHora } = req.body;

    const paciente = await getPatientById(pacienteId);

    if (!paciente) {
      return res.status(404).json({
        error: "Paciente no encontrado",
      });
    }

    const medico = await obtenerMedicoPorId(medicoId);

    if (!medico) {
      return res.status(404).json({
        error: "Médico no encontrado",
      });
    }

    const cita = await crearCita({
      pacienteId,
      medicoId,
      fechaHora,
    });

    return res.status(201).json(cita);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error al crear la cita",
    });
  }
}

export async function obtenerAgendaMedicoController(
  req: Request,
  res: Response,
) {
  try {
    const medicoId = Number(req.params.id);

    if (!Number.isInteger(medicoId)) {
      return res.status(400).json({
        error: "El ID del médico debe ser un número entero",
      });
    }

    const desde =
      typeof req.query.from === "string" ? new Date(req.query.from) : undefined;

    const hasta =
      typeof req.query.to === "string" ? new Date(req.query.to) : undefined;

    const citas = await obtenerAgendaMedico(medicoId, desde, hasta);

    return res.json(citas);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error al obtener la agenda del médico",
    });
  }
}

export async function actualizarEstadoCitaController(
  req: Request,
  res: Response,
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "El ID de la cita debe ser un número entero",
      });
    }

    const { estado } = req.body;

    const cita = await actualizarEstadoCita(id, estado);

    return res.json(cita);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        error: "Cita no encontrada",
      });
    }

    console.error(error);

    return res.status(500).json({
      error: "Error al actualizar el estado de la cita",
    });
  }
}
