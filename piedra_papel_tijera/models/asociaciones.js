import Partida from "./Partida.js";
import Usuario from "./Usuario.js";

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
