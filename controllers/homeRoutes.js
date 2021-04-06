const router = require('express').Router();
const { Blog, User } = require('../models');
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

// Homepage | http://localhost:3001/
router.get('/', async (req, res) => {

    console.log(chalk.magenta(`User ${req.session.user_id} visted http://localhost:3001/`));

    try {
        // If logged in, render dashboard page
        if (req.session.logged_in) {
            // const dashboardData = await Blog.
            res.redirect('/dashboard');
        }

        // Otherwise, render login page
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Dashboard page | http://localhost:3001/dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    console.log(chalk.magenta(`User ${req.session.user_id} visted http://localhost:3001/dashboard`));
    try {
        // If not logged in, redirect to login page
        // if (!req.session.logged_in) {
        //     res.redirect('/login')
        // }

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
