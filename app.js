require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const connectDB = require('./server/config/db.js')
const { isActiveRoute } = require('./server/helpers/routeHelpers.js')

const app = express();
const PORT = 3000 || process.env.PORT;

// Connect to DB
connectDB();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(methodOverride('_method'))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    // cookie: { maxAge: new Date ( Date.now() + (3600000) ) },
}))

// Static files for frontend -> css, js, img
app.use(express.static('public'));

// Templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.locals.currentRoute = req.path;
    next();
});
app.locals.isActiveRoute = isActiveRoute

app.use('/', require('./server/routes/main.js'))
app.use('/', require('./server/routes/admin.js'))

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});