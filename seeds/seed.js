const sequelize = require('../config/connection');
const { Comment, User, Blog } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const user = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const blog = await Blog.bulkCreate(blogData, {
        individualHooks: true,
        returning: true,
    });

    const comment = await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();