import prisma from "../config/prisma.js";

export function obtenerCitasPorEspecialidad() {
  return prisma.$queryRaw`
    SELECT
      e.nombre AS especialidad,
      COUNT(c.id)::int AS total_citas
    FROM citas c
    INNER JOIN medicos m ON m.id = c.medico_id
    INNER JOIN especialidades e ON e.id = m.especialidad_id
    GROUP BY e.nombre
    ORDER BY total_citas DESC
  `;
}
export async function obtenerCorteDiario(fecha: string) {
  const inicio = new Date(`${fecha}T00:00:00`);
  const fin = new Date(`${fecha}T23:59:59.999`);

  return prisma.cita.groupBy({
    by: ["estado"],
    where: {
      fechaHora: {
        gte: inicio,
        lte: fin,
      },
      estado: {
        in: ["COMPLETADA", "CANCELADA"],
      },
    },
    _count: {
      estado: true,
    },
  });
}
