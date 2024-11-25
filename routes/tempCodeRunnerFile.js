const express = require('express');
const mongoose =  require('mongoose')
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
       const getId = req.params.id;
       if(isNaN(getId)){
        return res.status(404).json({error:"invalid id"});
       }

       const CheckId = await studentModel.findOne({studentId:getId});

       if(!CheckId)
       {
        return res.status(404).json({error:"id is not available"});
       } 
       console.log("Data is sent");
       res.status(200).json(CheckId)
      
    }catch(err){
        console.log("some error ",err);
        res.status(500).json({error:"some error occured"})
    }
})

//update 

router.put('/:id',async(req,res)=>{
    try{
        const getStudentId = parseInt(req.params.id);
        const getStudentData = req.body;

        // Validate ObjectId format
        // if (!mongoose.Types.ObjectId.isValid(getStudentId)) {
        //     return res.status(400).json({ message: "Invalid ID format" });
        // }
        const databaseId = await studentModel.findOne({studentId:getStudentId})

        const response = await studentModel.findByIdAndUpdate(databaseId,getStudentData,{
            new:true,
            runValidators:true
        })
        if(!response){
            res.status(404).json({message:"student not found"})
        }
       console.log("updated");
       res.status(200).json(response)

    }catch(err){
      console.log(err);
      res.status(500).json({message:"error occured"})
    }

})


module.exports=router;