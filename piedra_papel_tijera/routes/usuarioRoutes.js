import {
  crearUsuario,
  getAllUsuarios,
  getPerfil,
} from "../controllers/UsuarioController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { Router } from "express";
const router = Router();

router.post("/crear", crearUsuario);
router.get("/", authMiddleware, getAllUsuarios);
router.get("/perfil", authMiddleware, getPerfil);

export default router;
