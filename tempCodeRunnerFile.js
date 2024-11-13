let express = require('express');
let app = express();
const port=3000;

const bodyParser = require('body-parser');

app.use(bodyParser.json());//for convert only json data ;
// app.use(bodyParser.urlencoded({extended:true}))//for convert the url or form data;

const db = require('./db');


//for get person informations
const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

//for menu items
const menuRoutes = require('./routes/menuRoutes');
app.use('/menuItem',menuRoutes);



app.get('/',(req,res)=>{
    res.send('hello saloni how can i help you')
    // res.status(200).json({message:'success'});
})



app.listen(port,()=>{
    console.log("server is running on port "+port);
})