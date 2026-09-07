import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

const citaSchema = z.object({
  pacienteId: z.number().int().positive(),
  medicoId: z.number().int().positive(),

  fechaHora: z.coerce
    .date()
    .refine(
      (fecha) => fecha > new Date(),
      "No puedes agendar una cita en una fecha que ya pasó",
    ),
});

const estadoCitaSchema = z.object({
  estado: z.enum(["COMPLETADA", "CANCELADA"]),
});

export function validarCita(req: Request, res: Response, next: NextFunction) {
  const resultado = citaSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      error: "Datos de la cita inválidos",
      detalles: resultado.error.issues,
    });
  }

  req.body = resultado.data;

  next();
}

export function validarEstadoCita(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = estadoCitaSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      error: "Estado de cita inválido",
      detalles: resultado.error.issues,
    });
  }

  req.body = resultado.data;

  next();
}
