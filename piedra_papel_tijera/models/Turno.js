import { DataTypes, Model } from "sequelize";
import db from "../database/db.js";

class Turno extends Model {}

Turno.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_partida: {
      type: DataTypes.INTEGER,
    },
    mano_j1: {
      type: DataTypes.STRING,
    },
    mano_j2: {
      type: DataTypes.STRING,
    },
    ganador_turno: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: "Turno",
    tableName: "turnos",
    timestamps: true,
  }
);

export default Turno;
