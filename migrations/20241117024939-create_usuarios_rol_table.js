"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usuario_rols", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "usuarios",
        },
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
        allowNull: true,
        defaultValue: null,
      },
      rol_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "rols",
        },
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
        allowNull: true,
        defaultValue: null,
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
    await queryInterface.dropTable("usuario_rols");
  },
};
