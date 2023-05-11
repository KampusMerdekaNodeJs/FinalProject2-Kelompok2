module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Photos",
      [
        {
          title: "Photo 1 tanpa uid",
          caption: "Caption photo 1",
          poster_image_url: "https://picsum.photos/id/1/200/300",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
};
