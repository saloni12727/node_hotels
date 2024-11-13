const { strict } = require('assert');
const mongoose = require('mongoose');
const PersonInfo = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        
    },
    work:{
        type:String,
        enum:['chef','manager','waiter'],
        required:true
    },
    mobile:{
        type:Number,
        required:true
    }, 
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
   
}
)

const personData = mongoose.model('personData',PersonInfo);
module.exports=personData
