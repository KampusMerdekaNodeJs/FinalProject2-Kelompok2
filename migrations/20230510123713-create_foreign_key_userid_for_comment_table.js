"use strict";

const { query } = require("express");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Comments", {
      fields: ["UserId"],
      type: "foreign key",
      name: "user_comment_fk",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onDelete: "cascade",
    });

    await queryInterface.addConstraint("Comments", {
      fields: ["PhotoId"],
      type: "foreign key",
      name: "photo_comment_fk",
      references: {
        table: "Photos",
        field: "id",
      },
      onDelete: "cascade",
      onDelete: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Comments", "user_comment_fk");
    await queryInterface.removeConstraint("Photos", "photo_comment_fk");
  },
};
