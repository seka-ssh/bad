const express = require('express');
const path = require('path');
const collection = require('./models/userModel');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 2000;

// Signup page
app.get('/signup', (req, res) => {
    res.render('signup');
});

// Signup handler
app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };
    await collection.insertMany([data]);
    res.render('home');
});

// Login page
app.get('/', (req, res) => {
    res.render('login');
});

// Login handler
app.post('/login', async (req, res) => {
    try {
        const user = await collection.findOne({
            name: req.body.name,
            password: req.body.password
        });
        if (user && user.password === req.body.password) {
            res.render('home');
        } else {
            res.render('new');
        }
    } catch (error) {
        res.render('new');
    }
});

// Home page
app.get('/home', (req, res) => {
    res.render('home');
});

// Error page
app.get('/new', (req, res) => {
    res.render('new');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});