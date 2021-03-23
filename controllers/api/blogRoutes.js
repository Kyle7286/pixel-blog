const router = require('express').Router();
const { Blog } = require('../../models');
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


router.post('/', async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;
