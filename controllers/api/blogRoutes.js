const router = require('express').Router();
const { Blog, Comment } = require('../../models');

//  Dashboard Page | http://localhost:3001/api/blogs
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

//  Create Blog | http://localhost:3001/api/blogs
router.post('/', async (req, res) => {
    try {
        const newBlog = await Blog.create({ title: req.body.headline, content: req.body.content, user_id: req.session.user_id });

        res.status(200).json(newBlog);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});


// Update Blog | http://localhost:3001/api/blogs/id
router.put('/:id', async (req, res) => {
    try {
        console.log(req.body);
        const blogData = await Blog.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        res.status(200).json(blogData)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// Delete Blog | http://localhost:3001/api/blogs/id
router.delete('/:id', async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!blogData) {
            res.status(404).json({ message: 'No Category with this id!' });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

//  Create Comment/Reply | http://localhost:3001/api/blogs/reply
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
