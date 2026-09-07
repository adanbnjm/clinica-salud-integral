import type { Request, Response } from "express";
import {
  createPatient,
  getAllPatients,
  getPatientById,
} from "../models/paciente.model.js";

export async function createPatientController(req: Request, res: Response) {
  try {
    const patient = await createPatient(req.body);

    return res.status(201).json(patient);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error al crear el paciente",
    });
  }
}

export async function getAllPatientsController(req: Request, res: Response) {
  try {
    const patients = await getAllPatients();

    return res.json(patients);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error al obtener los pacientes",
    });
  }
}

export async function getPatientByIdController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "El ID debe ser un número entero",
      });
    }

    const patient = await getPatientById(id);

    if (!patient) {
      return res.status(404).json({
        error: "Paciente no encontrado",
      });
    }

    return res.json(patient);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error al obtener el paciente",
    });
  }
}
