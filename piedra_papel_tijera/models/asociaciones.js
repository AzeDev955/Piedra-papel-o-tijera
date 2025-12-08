import Partida from "./Partida.js";
import Usuario from "./Usuario.js";
import Turno from "./Turno.js";

Partida.belongsTo(Usuario, { foreignKey: "id_jugador1", as: "jugador1" });
Partida.belongsTo(Usuario, { foreignKey: "id_jugador2", as: "jugador2" });
Usuario.hasMany(Partida, {
  foreignKey: "id_jugador1",
  as: "partidasJ1",
});

Usuario.hasMany(Partida, {
  foreignKey: "id_jugador2",
  as: "partidasJ2",
});

Partida.hasMany(Turno, { foreignKey: "id_partida", as: "turnos" });
Turno.belongsTo(Partida, { foreignKey: "id_partida", as: "partida" });
