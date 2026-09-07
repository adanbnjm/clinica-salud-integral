import { Router } from "express";
import { obtenerMedicosController } from "../controllers/medico.controller.js";

const router = Router();

router.get("/", obtenerMedicosController);

export default router;
