"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("turnos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_partida: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "partidas",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      mano_j1: {
        type: Sequelize.STRING,
      },
      mano_j2: {
        type: Sequelize.STRING,
      },
      ganador_turno: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("turnos");
  },
};
