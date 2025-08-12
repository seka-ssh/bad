const { name } = require('ejs');
const express = require('express');
const path = require('path');
const collection= require('./models/userModel');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))


const port = process.env.PORT || 2000;
app.get('/signup', (req, res) => {
    res.render('signup');
});
app.post('/signup',async (req,res)=>{
    const data={
        name: req.body.name,
        password: req.body.password

    }
    await collection.insertMany([data])
    res.render('home')
})

app.get('/', (req, res) => {
    res.render('Login');
});
app.post('/login',async(require,res)=>{
    try {
        const checkwetherUserexists=await collection.findOne({name:require.body.name,password:require.body.password})
        if(checkwetherUserexists.password===require.body.password){
            res.render('home');
        }    } catch  {
        res.render("new");
        
    }
})

app.get('/home',(req,res)=>{
    res.render('home');
    app.get('/new',(req,res)=>{
        res.render('new');
    })
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});