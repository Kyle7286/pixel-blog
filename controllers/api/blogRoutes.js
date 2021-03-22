const router = require('express').Router();
const { Blog } = require('../../models');
// const withAuth = require('../../utils/auth');

//  ../api/blogs
router.get('/', async (req, res) => {
    try {
        // Query all information
        const blogData = await Blog.findAll({
            // include: [{ model: User }],
        })
        // Send data in response as JSON
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
