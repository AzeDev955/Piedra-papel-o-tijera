import { DataTypes, Model } from "sequelize";
import db from "../database/db.js";
import Partida from "./Partida.js";

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_rol: {
      type: DataTypes.TINYINT,
      defaultValue: 2,
    },
  },
  {
    sequelize: db,
    modelName: "Usuario",
    tableName: "usuarios",
    timestamps: true,
  }
);

export default Usuario;
