import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import Usuario from "../models/Usuario.js";
import dotenv from "dotenv";
dotenv.config();

const login = async (req, res) => {
  try {
    const { identificador, password } = req.body;

    const usuario = await Usuario.findOne({
      where: {
        [Op.or]: [{ email: identificador }, { nickname: identificador }],
      },
    });

    if (!usuario) {
      return res.status(404).json({ error: "usuario no encontrado" });
    }

    if (usuario.password !== password) {
      return res.status(402).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario.id, nickname: usuario.nickname },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );
    return res.json({ mensaje: "Login correcto", token, usuario: usuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { login };
