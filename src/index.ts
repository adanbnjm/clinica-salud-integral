import express from "express";
import prisma from "./config/prisma.js";

import medicoRoutes from "./routes/medico.routes.js";
import pacienteRoutes from "./routes/paciente.routes.js";
import citaRoutes from "./routes/cita.routes.js";
import authRoutes from "./routes/auth.routes.js";
import reporteRoutes from "./routes/reporte.routes.js";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json" with { type: "json" };

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "API Clínica de Salud Integral funcionando",
  });
});

app.get("/api/especialidades", async (req, res) => {
  const especialidades = await prisma.especialidad.findMany();

  res.json(especialidades);
});

app.use("/api/medicos", medicoRoutes);

app.use("/api/pacientes", pacienteRoutes);

app.use("/api/citas", citaRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/reports", reporteRoutes);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});
