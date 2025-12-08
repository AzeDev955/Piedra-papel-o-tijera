import Partida from "../models/Partida.js";

const crearPartida = async (req, res) => {
  try {
    const id_jugador1 = req.user.id;
    const nuevaPartida = await Partida.create({
      id_jugador1: id_jugador1,
      estado: 0,
    });

    res.json(nuevaPartida);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const unirsePartida = async (req, res) => {
  try {
    const id_jugador2 = req.user.id;
    const { id_partida } = req.params;
    const partida = await Partida.findByPk(id_partida);
    if (!partida) {
      return res.status(404).json({ error: "No existe esa partida" });
    }

    if (partida.id_jugador2 !== null) {
      return res.status(404).json({ error: "La partida esta llena" });
    }

    partida.id_jugador2 = id_jugador2;
    partida.estado = 1; // llena/jugando

    await partida.save();
    res.json({ message: "Te has unido a la partida!", partida });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getAllPartidas = async (req, res) => {
  try {
    const partidas = await Partida.findAll();
    res.json(partidas);
  } catch {
    res.json("aqui no funciona nada");
  }
};

export { crearPartida, unirsePartida, getAllPartidas };
