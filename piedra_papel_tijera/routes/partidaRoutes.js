import {
  crearPartida,
  unirsePartida,
  getAllPartidas,
} from "../controllers/PartidaController.js";
import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/crear", authMiddleware, crearPartida);
router.put("/unirse/:id_partida", authMiddleware, unirsePartida);
router.get("/", getAllPartidas);

export default router;
