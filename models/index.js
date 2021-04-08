const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');
// A single user can have many blogs
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
})

Blog.belongsTo(User, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'id'
})

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id'
})



module.exports = { Comment, User, Blog };