import Partida from "../models/Partida.js";
import Turno from "../models/Turno.js";
import Usuario from "../models/Usuario.js";
import { Op } from "sequelize";

const getPartidaById = async (req, res) => {
  try {
    const { id_partida } = req.params;
    const partida = await Partida.findByPk(id_partida, {
      include: [
        { model: Usuario, as: "jugador1", attributes: ["nickname"] }, //ayuda del 4to integrante, quiero los nicks para ponerlos en el juego
        { model: Usuario, as: "jugador2", attributes: ["nickname"] },
      ],
    });
    if (!partida) {
      return res.status(404).json({ error: "Partida no encontrada" });
    }
    res.json(partida);
  } catch (error) {
    console.error(error);
  }
};

const crearPartida = async (req, res) => {
  try {
    const id_jugador1 = req.user.id;
    const partidaActiva = await Partida.findOne({
      where: {
        [Op.or]: [{ id_jugador1 }, { id_jugador2: id_jugador1 }],
        estado: 0,
      },
    });

    if (partidaActiva) {
      return res.status(400).json({ error: "Ya tienes una partida en curso." });
    }
    const nuevaPartida = await Partida.create({
      id_jugador1: id_jugador1,
      estado: 0,
    });

    res.json(nuevaPartida);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const crearPartidaCPU = async (req, res) => {
  try {
    const id_jugador1 = req.user.id;

    const botUser = await Usuario.findOne({ where: { id_rol: 3 } });
    if (!botUser)
      return res
        .status(500)
        .json({ error: "El sistema no tiene un BOT configurado." });

    const partidaActiva = await Partida.findOne({
      where: {
        [Op.or]: [{ id_jugador1 }, { id_jugador2: id_jugador1 }],
        estado: 0,
      },
    });

    if (partidaActiva) {
      return res.status(400).json({ error: "Ya tienes una partida en curso." });
    }

    const nuevaPartida = await Partida.create({
      id_jugador1: id_jugador1,
      id_jugador2: botUser.id,
      estado: 1,
      puntuacion_j1: 0,
      puntuacion_j2: 0,
    });

    res.json(nuevaPartida);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear partida vs CPU" });
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

const jugarTurno = async (req, res) => {
  const { id_partida } = req.params;
  const { mano } = req.body;
  const id_usuario = req.user.id;
  try {
    const partida = await Partida.findByPk(id_partida, {
      include: [
        { model: Usuario, as: "jugador1", attributes: ["nickname"] }, //de nuevo para devolver los nicks
        { model: Usuario, as: "jugador2", attributes: ["nickname", "id_rol"] }, //ahora tambien ayuda para pillar el rol
      ],
    });
    if (!partida)
      return res.status(404).json({ error: "Partida no encontrada" });
    if (partida.estado !== 1)
      return res.status(400).json({ error: "Partida no activa" });

    let turno = await Turno.findOne({
      where: { id_partida },
      order: [["createdAt", "DESC"]],
    });

    if (!turno || (turno.mano_j1 && turno.mano_j2)) {
      turno = await Turno.create({ id_partida });
    }

    let soyJugador1 = false;

    if (partida.id_jugador1 === id_usuario) {
      soyJugador1 = true;
      if (turno.mano_j1)
        return res
          .status(400)
          .json({ error: "Ya jugaste este turno, espera al rival" });
      turno.mano_j1 = mano;
    } else if (partida.id_jugador2 === id_usuario) {
      soyJugador1 = false;
      if (turno.mano_j2)
        return res
          .status(400)
          .json({ error: "Ya jugaste este turno, espera al rival" });
      turno.mano_j2 = mano;
    } else {
      return res.status(403).json({ error: "No participas en esta partida" });
    }

    await turno.save();
    if (partida.jugador2.id_rol === 3) {
      const opciones = ["piedra", "papel", "tijera"];
      turno.mano_j2 = opciones[Math.floor(Math.random() * 3)];
      await turno.save();
    }

    const sala = `partida_${id_partida}`;

    if (turno.mano_j1 && turno.mano_j2) {
      const m1 = turno.mano_j1;
      const m2 = turno.mano_j2;
      let ganadorId = null;

      if (m1 === m2) {
        ganadorId = null;
      } else if (
        (m1 === "piedra" && m2 === "tijera") ||
        (m1 === "papel" && m2 === "piedra") ||
        (m1 === "tijera" && m2 === "papel")
      ) {
        partida.puntuacion_j1 += 1;
        ganadorId = partida.id_jugador1;
      } else {
        partida.puntuacion_j2 += 1;
        ganadorId = partida.id_jugador2;
      }

      let partidaTerminada = false;
      let ganadorPartida = null;
      if (partida.puntuacion_j1 >= 3 || partida.puntuacion_j2 >= 3) {
        partida.estado = 2;
        partidaTerminada = true;
        if (partida.puntuacion_j1 > partida.puntuacion_j2) {
          ganadorPartida = partida.id_jugador1;
        } else {
          ganadorPartida = partida.id_jugador2;
        }
      }

      turno.ganador_turno = ganadorId;
      await turno.save();
      await partida.save();

      let nickGanadorPartida = null;
      if (partidaTerminada && ganadorPartida) {
        nickGanadorPartida =
          ganadorPartida === partida.id_jugador1
            ? partida.jugador1.nickname
            : partida.jugador2.nickname;
      }

      req.io.to(sala).emit("turno_resuelto", {
        resultado: ganadorId ? `Ganó el jugador ${ganadorId}` : "Empate",
        manos: { j1: m1, j2: m2 },
        marcador: { j1: partida.puntuacion_j1, j2: partida.puntuacion_j2 },
        partidaTerminada: partidaTerminada,
        ganadorPartida: nickGanadorPartida,
      });

      return res.json({
        message: "Turno resuelto",
      });
    }

    res.json({ message: "Jugada guardada. Esperando al rival..." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "algo ha ido mal" });
  }
};

export {
  crearPartida,
  unirsePartida,
  getAllPartidas,
  jugarTurno,
  getPartidaById,
  crearPartidaCPU,
};
