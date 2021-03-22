const router = require('express').Router();
const { User } = require('../../models');
// const withAuth = require('../../utils/auth');

//  ../api/blogs
router.get('/', async (req, res) => {
    try {
        // Query all information
        const userData = await User.findAll({
            // include: [{ model: Blog }],
        })
        // Send data in response as JSON
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
