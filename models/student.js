const mongoose = require('mongoose');
const studentShcema = new mongoose.Schema({
    studentId:{
        type:Number,
        required:true,
        unique:true
    },
    rollNum:{
      type:Number,
      required:true,
    },
    name:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
        enum:['commerce','science','maths']
    },
    gender:{
        type:String,
        required:true,
       enum:['male','female','other']
    },
    Address:{
        type:String,
        required:true,
       
    },

})

const studentRecord = mongoose.model('studentRecord',studentShcema,'studentRecord')
module.exports=studentRecord;