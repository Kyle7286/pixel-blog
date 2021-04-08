// Import all models
const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// A user can have many blogs
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
// A user and have many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
})
// A blog can have many comments
Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
})
// A blog belongs to a single user
Blog.belongsTo(User, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});
// A comment belongs to a single user
Comment.belongsTo(User, {
    foreignKey: 'id'
})
// A comment belongs to a single blog
Comment.belongsTo(Blog, {
    foreignKey: 'blog_id'
})

// Expore the above associations
module.exports = { Comment, User, Blog };