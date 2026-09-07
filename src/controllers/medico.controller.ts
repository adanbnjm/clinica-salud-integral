import type { Request, Response } from "express";
import { obtenerMedicos } from "../models/medico.model.js";

export async function obtenerMedicosController(req: Request, res: Response) {
  try {
    const especialidad =
      typeof req.query.especialidad === "string"
        ? req.query.especialidad
        : undefined;

    const medicos = await obtenerMedicos(especialidad);

    return res.json(medicos);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error al obtener los médicos",
    });
  }
}
