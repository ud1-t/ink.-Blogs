const express = require('express');
const router = express.Router();
const Post = require('../model/Post.js')
const User = require('../model/User.js')

const adminLayout = '../views/layouts/admin'
/*
/ GET /
/ Admin - login
*/
router.get('/admin', async (req, res) => {
    try {
        const locals = {
            title: `ink. - Admin`,
            description: "Simple blog created with NodeJs, Express & MongoDb."
        }

        res.render('admin/index', { locals, layout: adminLayout });
    } catch (error) {
        console.log(error)
    }
});

/*
/ POST /
/ Admin - Check Login
*/
router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body


        res.send('admin');
    } catch (error) {
        console.log(error)
    }
});

module.exports = router