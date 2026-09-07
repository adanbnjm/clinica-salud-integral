import prisma from "../config/prisma.js";

export function obtenerMedicos(especialidad?: string) {
  return prisma.medico.findMany({
    ...(especialidad
      ? {
          where: {
            especialidad: {
              nombre: {
                equals: especialidad,
                mode: "insensitive",
              },
            },
          },
        }
      : {}),
    include: {
      especialidad: true,
    },
  });
}

export function obtenerMedicoPorId(id: number) {
  return prisma.medico.findUnique({
    where: {
      id,
    },
    include: {
      especialidad: true,
    },
  });
}
