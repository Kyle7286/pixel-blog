const router = require('express').Router();
const { Comment, Blog, User } = require('../models');
const chalk = require('chalk');
const { findAll } = require('../models/Blog');
const withAuth = require('../utils/auth');

// Homepage | http://localhost:3001/
router.get('/', async (req, res) => {
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
        // Serialize data so the template can read it
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        console.log(blogs);
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Blog Post | http://localhost:3001/blog/:id
router.get('/blog/:id', async (req, res) => {
    try {
        // // Get all projects and JOIN with user data
        const blogData = await Blog.findAll({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ['name'] }]

                }
            ],

        });

        // const pewpew = await blogData[0].comments.map((element) => {
        //     console.log("===============");
        //     // console.log(element.dataValues.date_created);
        //     const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        //     x = element.dataValues.date_created.toLocaleDateString('en-US', options);
        //     console.log(x);
        //     element.localTime = x;
        //     return x;

        // })
        const x = blogData[0].dataValues.comments.map((element) => {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            const localTime = element.dataValues.date_created.toLocaleDateString('en-US', options);
            element.dataValues.localTime = localTime;


        })

        // Serialize data so the template can read it
        const blog = blogData.map((blog) => blog.get({ plain: true }));

        // console.log(blog[0]);

        res.render('blog', {
            blog: blog[0],
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(` 
        =================
        ${err}
        =================
        `);
        res.status(500).json(err);
    }
});


// Dashboard page | http://localhost:3001/dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    console.log(chalk.magenta(`User ${req.session.user_id} visted http://localhost:3001/dashboard`));
    try {

        // Render dashboard page if all above checks pass
        const dashboardData = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['id', 'DESC'],
            ]
        });

        console.log(dashboardData);

        res.render('dashboard', {
            dashboardData,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }


})

// Login Page | http://localhost:3001/login
router.get('/login', (req, res) => {
    console.log(chalk.magenta(`Hit http://localhost:3001/login`));

    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        console.log(chalk.magenta(`User ${req.session.user_id} | Logged_in = ` + chalk.green.bold(`${req.session.logged_in}`) + ` | Redirecting to /dashboard!`));
        return;
    }
    console.log(chalk.magenta(`Logged_in = ` + chalk.green.bold(`${req.session.logged_in}`) + ` | Redirecting to /login!`));

    res.render('login');
});


module.exports = router;
