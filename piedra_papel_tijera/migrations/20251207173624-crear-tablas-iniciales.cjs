"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("usuarios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_rol: {
        type: Sequelize.TINYINT,
        defaultValue: 2,
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
    await queryInterface.createTable("partidas", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_jugador1: {
        type: Sequelize.INTEGER,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
      id_jugador2: {
        type: Sequelize.INTEGER,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
      estado: {
        type: Sequelize.TINYINT, //0 jugando, 1 terminada
      },
      puntuacion_j1: {
        type: Sequelize.TINYINT,
      },
      puntuacion_j2: {
        type: Sequelize.TINYINT,
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("partidas");
    await queryInterface.dropTable("usuarios");
  },
};
