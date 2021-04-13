const router = require('express').Router();
const { Blog, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

//  ../api/blogs
router.get('/', async (req, res) => {
    try {
        // Query all information
        const blogData = await Blog.findAll({
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['id', 'DESC'],
            ]
        })
        // Send data in response as JSON
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//  ../api/blogs
router.post('/', async (req, res) => {
    try {
        const newBlog = await Blog.create({ title: req.body.headline, content: req.body.content, user_id: req.session.user_id });

        res.status(200).json(newBlog);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

//  ../api/blogs/comment
router.post('/reply', async (req, res) => {
    try {
        const newComment = await Comment.create({ blog_id: req.body.blog_id, content: req.body.content, user_id: req.session.user_id });

        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});


module.exports = router;
