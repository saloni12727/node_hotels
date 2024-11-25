const mongoose = require('mongoose');
const bcrypt= require('bcrypt');

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
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    } 
   
}
)
PersonInfo.pre('save',async function(next){
     const personD = this;
    //  hash password only if the person is modified the password or its new
     if(!personD.isModified('password')) return next();
     try{
       //add salt is password
       const saltpass = await bcrypt.genSalt(10)
        // hash password
       const hashPass = await bcrypt.hash(personD.password,saltpass);
       personD.password=hashPass;
       next();
     }catch(err){
    return next(err);
     }
})
PersonInfo.methods.comparePassword= async function(candidatepass){
    
     try{
      const isMatch = await bcrypt.compare(candidatepass,this.password);
      return isMatch;
     }catch(err){
       throw err;
     }
}

const personData = mongoose.model('personData',PersonInfo);
module.exports=personData
