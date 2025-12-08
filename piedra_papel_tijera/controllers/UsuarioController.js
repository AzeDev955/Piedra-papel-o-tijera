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

export { crearUsuario, getAllUsuarios };
