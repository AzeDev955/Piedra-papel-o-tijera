import {
  crearPartida,
  unirsePartida,
  getAllPartidas,
} from "../controllers/PartidaController.js";
import { Router } from "express";
const router = Router();

router.post("/crear", crearPartida);
router.put("/unirse/:id_partida", unirsePartida);
router.get("/", getAllPartidas);

export default router;
