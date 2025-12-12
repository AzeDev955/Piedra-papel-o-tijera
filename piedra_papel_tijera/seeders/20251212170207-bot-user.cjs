"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const botExiste = await queryInterface.rawSelect(
      "usuarios",
      {
        where: {
          nickname: "MARTABOT",
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
            id_rol: 2,
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
    // Si queremos deshacer el seed, borramos al bot
    await queryInterface.bulkDelete("usuarios", { nickname: "BOT" }, {});
  },
};
