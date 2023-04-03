const sequelize = require("../config/connection");
const { Blog, User } = require("../models");

const blogData = require("./blogsData.json");
const userData = require("./userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blogger of blogData) {
    await Blog.create({
      ...blogger,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
