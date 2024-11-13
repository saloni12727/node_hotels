const express = require('express');
let router = express.Router();

const personModel =require('../models/person');



// app.post('/person',async(req,res)=>{
//     try{
//         const Data = req.body;
//         const newPerson =  new personModel(Data);
//         const response =await newPerson.save()
//         console.log("data saved");
        
//         //we can also put data in this way but it's not the right way
//         // person.name=Data.name;
//         // person.age=Data.age;
//         // person.mobile=Data.mobile;
//         res.status(200).json(response);
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error:"error occured"});

//     }
// })

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


//for update
router.put('/:id',async(req,res)=>{
    try{
       const personId = req.params.id; //get the data form id 
       const personData = req.body;    //get the data according to id

       const response = await personModel.findByIdAndUpdate(personId,personData,{
        new : true ,// for new updated document
        runValidators:true   //check the mongoose validators for new document
       })
       
       if(!response)   //if id is wrong or id is not available
        {
        return res.status(404).json({error:"invalid id"})
        }

       console.log("data update");
       res.status(200).json(response);

    }catch(err){
     console.log("error",err);
     res.status(500).json({error:"some error occures"});
    }
})


//delete

router.delete('/:id',async(req,res)=>{
    try{
     const getPerson = req.params.id;
     const deletedPerson = await personModel.findByIdAndDelete(getPerson);

     if(!deletedPerson)
     {
        return res.status(404).json({error:"invalid id"})
     }

     console.log("data deleted");
     res.status(200).json({message:"deleted successfully"});


    }catch(err){
        console.log("error",err);
        res.status(500).json({error:"some error occures"});
    }
})


module.exports=router;