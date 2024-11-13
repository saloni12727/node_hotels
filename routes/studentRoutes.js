const express = require('express');
const router = express.Router();
const studentModel = require('../models/student');


//save student information
router.post('/',async(req,res)=>{
    try{
       const data = req.body; //get data from the clint which is store in req.body
       const newStudent = new studentModel(data);  //create new instance of student or create new object for new student data 
       const response = await newStudent.save();
       console.log("data save in data base");
       res.status(200).json(response)
    }catch(err){
      console.log("some error ",err);
      res.status(500).json({error:"some error occured"})
    }
})


//send data to server to clint

router.get('/',async(req,res)=>{
    try{
       const data = await studentModel.find()
       console.log("data send");
       res.status(200).json(data);
    }catch(err){
        console.log("some error ",err);
        res.status(500).json({error:"some error occured"})
    }
})

//find student from there unique id

router.get('/:id',async(req,res)=>{
    try{
       const getId = parseInt(req.params.id);
       if(!isNaN(getId))
       {
        const databaseId = await studentModel.findOne({studentId:getId})
        console.log("data is send")
        res.status(200).json(databaseId)
       }
       else{
        res.status(404).json({error:"invalid id "})
       }
   
    }catch(err){
        console.log("some error ",err);
        res.status(500).json({error:"some error occured"})
    }
})







module.exports=router;