require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts')

const connectDB = require('./server/config/db.js')

const app = express();
const PORT = 3000 || process.env.PORT;

// Connect to DB
connectDB();

// Static files for frontend -> css, js, img
app.use(express.static('public'));

// Templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main.js'))

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});