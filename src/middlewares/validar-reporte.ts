import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

const fechaReporteSchema = z
  .string()
  .date("La fecha debe tener formato YYYY-MM-DD");

export function validarFechaReporte(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = fechaReporteSchema.safeParse(req.query.date);

  if (!resultado.success) {
    return res.status(400).json({
      error: "Fecha inválida",
      detalles: resultado.error.issues,
    });
  }

  next();
}
