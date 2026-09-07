import type { Request, Response } from "express";
import {
  obtenerCitasPorEspecialidad,
  obtenerCorteDiario,
} from "../models/reporte.model.js";

export async function obtenerCitasPorEspecialidadController(
  _req: Request,
  res: Response,
) {
  try {
    const reporte = await obtenerCitasPorEspecialidad();
    return res.json(reporte);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error al obtener el reporte de citas por especialidad",
    });
  }
}

export async function obtenerCorteDiarioController(
  req: Request,
  res: Response,
) {
  try {
    const fecha = req.query.date;

    if (typeof fecha !== "string") {
      return res.status(400).json({
        error: "La fecha es obligatoria",
      });
    }

    const resultado = await obtenerCorteDiario(fecha);

    const completadas =
      resultado.find((item) => item.estado === "COMPLETADA")?._count.estado ??
      0;

    const canceladas =
      resultado.find((item) => item.estado === "CANCELADA")?._count.estado ?? 0;

    return res.json({
      fecha,
      completadas,
      canceladas,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error al obtener el corte operativo diario",
    });
  }
}
