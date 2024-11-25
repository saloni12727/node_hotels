//adding .env
require ('dotenv').config()
const mongoose =require('mongoose');

const mongoUrl = 'mongodb://localhost:27017/hotel'
// const mongoUrl = process.env.MongoUrl_altla;

mongoose.connect(mongoUrl)//, you call mongoose.connect() to establish a connection to the MongoDB database using the URL

const db = mongoose.connection;// Mongoose maintains a default connection object representing the MongoDB connection. You retrieve this object using mongoose.connection, and you've stored it in the variable db. This object is what you'll use to handle events and interact with the database.

db.on('connected',()=>{
    console.log("mongodb connected ");
});

db.on('error',(err)=>{
    console.log("some error " +err);
});

db.on('disconnected',()=>{
    console.log("mongodb disconnectes");
})

module.exports = db;
