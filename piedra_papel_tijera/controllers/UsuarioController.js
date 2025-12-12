import Usuario from "../models/Usuario.js";
import db from "../database/db.js";

const crearUsuario = async (request, response) => {
  const usuario = await Usuario.create(request.body);

  return response.json(usuario);
};

const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch {
    res.json("aqui no funciona nada");
  }
};

const getPerfil = async (req, res) => {
  try {
    const idUsuario = req.user.id;

    const usuario = await Usuario.findByPk(idUsuario, {
      attributes: ["id", "nickname", "email", "password", "id_rol"],
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener perfil" });
  }
};

export { crearUsuario, getAllUsuarios, getPerfil };
