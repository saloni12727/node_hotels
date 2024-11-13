const express = require('express');
let router = express.Router();

// const personModel =require('../models/person');


//for save the data in database
router.post('/',async(req,res)=>{
    try{
        const data = req.body;
        const newPerson = new personModel(data);
        const response = await newPerson.save();
        console.log("data saved in database");
        res.status(200).json(response);
    }catch(err){
         console.log("some error"+err);
         res.status(500).json({error:"some error occured"})
    }
  
})


//for send data from server to clint
router.get('/',async(req,res)=>{
    try{
    const data = await personModel.find()
    console.log("data send");
    res.status(200).json(data);
    }catch(err){
      console.log("some error",err);
      res.status(500).json({error:"some error"});
    }
})

//get person with their work
router.get('/:workType',async(req,res)=>{
    try{
        const data = req.params.workType
        if(data == 'chef' || data == 'manager' || data == 'waiter')
        {
           const response = await personModel.find({work:data});
           console.log("data send");
           res.status(200).json(response)
        }
        else{
           res.status(404).json({error:"invalid work type"})
        }
    }catch(err){
        console.log("error",err);
        res.status(500).json({error:"some error occured"})
    }
})

module.exports=router;