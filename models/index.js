const User = require('./User');
const Blog = require('./Blog');
// A single user can have many blogs
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// A single blog belongs to a single user
Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Blog };