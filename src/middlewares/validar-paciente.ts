import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

const pacienteSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),

  apellidoPaterno: z.string().min(1, "El apellido paterno es obligatorio"),

  apellidoMaterno: z.string().optional(),

  ci: z.string().min(1, "El CI es obligatorio"),

  email: z.string().email("El correo no tiene un formato válido"),

  telefono: z.string().optional(),

  direccion: z.string().optional(),

  fechaNacimiento: z.coerce
    .date()
    .max(new Date(), "La fecha de nacimiento no puede ser futura"),
});

export function validarPaciente(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = pacienteSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      error: "Datos del paciente inválidos",
      detalles: resultado.error.issues,
    });
  }

  req.body = resultado.data;

  next();
}
