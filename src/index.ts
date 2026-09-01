import express from "express";
import prisma from "./config/prisma.js";

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

app.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});
