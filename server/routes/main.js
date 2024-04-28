const express = require('express');
const router = express.Router();
const Post = require('../model/Post.js')

/*
/ GET /
/ Home
*/
router.get('', async (req, res) => {
    try {
        const locals = {
            title: "ink.",
            description: "Simple blog created with NodeJs, Express & MongoDb."
        }

        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{ $sort: { createdAt: -1 }}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec()

        const count = await Post.countDocuments()
        const nextPage = parseInt(page) + 1
        const hasNextPage = nextPage <= Math.ceil(count / perPage)

        res.render('index', {
            locals, 
            data, 
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
        });
    } catch (error) {
        console.log(error)
    }
});


/*
/ GET /
/ Post :id
*/
router.get('/post/:id', async (req, res) => {
    try {
        const slug = req.params.id;
        const data = await Post.findById({ _id: slug })

        const locals = {
            title: `ink. - ${data.title}`,
            description: "Simple blog created with NodeJs, Express & MongoDb."
        }

        res.render('post', { locals, data, currentRoute: `/post/${slug}` });
    } catch (error) {
        console.log(error)
    }
});


/*
/ POST /
/ Post - searchterm
*/
router.post('/search/', async (req, res) => {
    try {
        const locals = {
            title: `ink. - Search`,
            description: "Simple blog created with NodeJs, Express & MongoDb."
        }

        let searchTerm = req.body.searchTerm;
        let searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i' )}},
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i' )}}
            ]
        })

        res.render("search", {
            locals,
            data,
        });
    } catch (error) {
        console.log(error)
    }
});


router.get('/about', (req, res) => {
    res.render('about', {
        currentRoute: '/about'
    });
});

router.get('/contact', (req, res) => {
    res.render('contact', {
        currentRoute: '/contact'
    });
});

module.exports = router




// function insertPostData() {
//     Post.insertMany([
//         {
//             title: 'Building APIs with NodeJs',
//             body: 'Learn how to use Nodejs to build RESTful APIsusing framworks like Express.js'
//         },
//         {
//             title: 'Introduction to React',
//             body: 'A beginner-friendly guide to understanding the basics of React.js'
//           },
//           {
//             title: 'MongoDB Basics',
//             body: 'Learn the fundamentals of MongoDB and how to use it in your projects'
//           },
//           {
//             title: 'Authentication with Passport.js',
//             body: 'Implement user authentication in your Node.js applications using Passport.js'
//           },
//           {
//             title: 'Handling Forms in Express',
//             body: 'Learn different techniques for handling forms in Express.js applications'
//           },
//           {
//             title: 'Deploying Node.js Apps to Heroku',
//             body: 'A step-by-step guide to deploying your Node.js applications to Heroku'
//           },
//           {
//             title: 'Working with WebSockets',
//             body: 'Explore the world of real-time communication with WebSockets in Node.js'
//           },
//           {
//             title: 'Testing Node.js Applications',
//             body: 'Best practices for testing Node.js applications using frameworks like Mocha and Chai'
//           },
//           {
//             title: 'Building a RESTful API with Express and MongoDB',
//             body: 'A comprehensive tutorial on building a RESTful API using Express.js and MongoDB'
//           },
//     ])
// }

// insertPostData();