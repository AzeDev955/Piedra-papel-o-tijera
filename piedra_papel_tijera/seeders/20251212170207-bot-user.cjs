"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const botExiste = await queryInterface.rawSelect(
      "usuarios",
      {
        where: {
          id_rol: 3,
        },
      },
      ["id"]
    );

    if (!botExiste) {
      await queryInterface.bulkInsert(
        "usuarios",
        [
          {
            nickname: "MARTABOT",
            email: "bot@piedrapapeltijera.com",
            password: "bipbop",
            id_rol: 3, //quizas deberia poner rol 3 para dividir por bots?! voy con ello de hecho
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
      console.log("✅ Usuario BOT insertado correctamente.");
    } else {
      console.log("⚠️ El usuario BOT ya existe.");
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("usuarios", { id_rol: 3 }, {});
  },
};
