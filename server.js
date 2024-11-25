let express = require('express');
let app = express();
// const port=3000;
require('dotenv').config();
const passport = require('./auth');

//if port is define in .env file it will use that port but if not avalible then use 3000
const PORT = 3000;
//day 7 hosting
//day 8 middleware

//using authantication middlware
app.use(passport.initialize())
const localStrategy = passport.authenticate('local',{session:false})
const bodyParser = require('body-parser');


app.use(bodyParser.json());//for convert only json data ;
// app.use(bodyParser.urlencoded({extended:true}))//for convert the url or form data;

const db = require('./db');

const logging = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] request made to :${req.originalUrl}  url`)
    next() //calling next is must needed if you not then it will not move for next function
}

//2. using middlware as whole document
// app.use(logging);

//for get person informations
//3. using middleware only person route
const personRoutes = require('./routes/personRoutes');
//add authantigation
app.use('/person',personRoutes);

//for menu items
const menuRoutes = require('./routes/menuRoutes');
app.use('/menuItem',menuRoutes);

//student data 
const studentRoutes = require('./routes/studentRoutes');
app.use('/student',studentRoutes);


// 1. using middlware on / url
// like tnhis app.get('/',logging,(req,res)=>{
app.get('/',(req,res)=>{
    res.send('hello saloni how can i help you')
    // res.status(200).json({message:'success'});
})



app.listen(PORT,()=>{
    console.log("server is running on port "+PORT);
})