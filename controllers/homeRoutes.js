const router = require('express').Router();
const { Blog, User } = require('../models');
// const withAuth = require('../utils/auth');

// Homepage | http://localhost:3001/
router.get('/', async (req, res) => {
    console.log("maskdlfasjfk");
    try {
        // // Get all projects and JOIN with user data
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        console.log("mew");
        // Serialize data so the template can read it
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        console.log(blogs);
        res.render('homepage', {
            blogs
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
