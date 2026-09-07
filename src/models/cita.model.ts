import prisma from "../config/prisma.js";

export function crearCita(data: {
  pacienteId: number;
  medicoId: number;
  fechaHora: Date;
}) {
  return prisma.cita.create({
    data: {
      pacienteId: data.pacienteId,
      medicoId: data.medicoId,
      fechaHora: data.fechaHora,
    },
    include: {
      paciente: true,
      medico: {
        include: {
          especialidad: true,
        },
      },
    },
  });
}

export function obtenerAgendaMedico(
  medicoId: number,
  desde?: Date,
  hasta?: Date,
) {
  return prisma.cita.findMany({
    where: {
      medicoId,
      ...(desde && hasta
        ? {
            fechaHora: {
              gte: desde,
              lte: hasta,
            },
          }
        : {}),
    },
    include: {
      paciente: true,
    },
    orderBy: {
      fechaHora: "asc",
    },
  });
}

export function actualizarEstadoCita(
  id: number,
  estado: "COMPLETADA" | "CANCELADA",
) {
  return prisma.cita.update({
    where: {
      id,
    },
    data: {
      estado,
    },
    include: {
      paciente: true,
      medico: {
        include: {
          especialidad: true,
        },
      },
    },
  });
}
