import {
  crearPartida,
  unirsePartida,
  getAllPartidas,
  jugarTurno,
  getPartidaById,
  crearPartidaCPU,
} from "../controllers/PartidaController.js";
import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/crear", authMiddleware, crearPartida);
router.post("/crearCPU", authMiddleware, crearPartidaCPU);
router.put("/unirse/:id_partida", authMiddleware, unirsePartida);
router.get("/", getAllPartidas);
router.get("/:id_partida", authMiddleware, getPartidaById);
router.post("/:id_partida/jugar", authMiddleware, jugarTurno);

export default router;
