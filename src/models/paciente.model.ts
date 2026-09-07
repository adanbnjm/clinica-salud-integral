import prisma from "../config/prisma.js";

export function createPatient(data: any) {
  return prisma.paciente.create({
    data,
  });
}

export function getAllPatients() {
  return prisma.paciente.findMany();
}

export function getPatientById(id: number) {
  return prisma.paciente.findUnique({
    where: {
      id,
    },
    include: {
      citas: {
        include: {
          medico: {
            include: {
              especialidad: true,
            },
          },
        },
        orderBy: {
          fechaHora: "desc",
        },
      },
    },
  });
}
