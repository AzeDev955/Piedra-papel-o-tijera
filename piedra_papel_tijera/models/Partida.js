import { DataTypes, Model } from "sequelize";
import db from "../database/db.js";
import Usuario from "./Usuario.js";

class Partida extends Model {}

Partida.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_jugador1: {
      type: DataTypes.INTEGER,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    id_jugador2: {
      type: DataTypes.INTEGER,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    estado: {
      type: DataTypes.TINYINT, //0 esperando, 1 jugando, 2 terminada
    },
    puntuacion_j1: {
      type: DataTypes.TINYINT,
    },
    puntuacion_j2: {
      type: DataTypes.TINYINT,
    },
  },
  {
    sequelize: db,
    modelName: "Partida",
    tableName: "partidas",
    timestamps: true,
  }
);

export default Partida;
