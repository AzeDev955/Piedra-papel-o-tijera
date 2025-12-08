import {
  crearUsuario,
  getAllUsuarios,
} from "../controllers/UsuarioController.js";
import { Router } from "express";
const router = Router();

router.post("/crear", crearUsuario);
router.get("/", getAllUsuarios);

export default router;
