const express = require('express');
let router = express.Router();
const  {jwtMiddlware,genrateToke} = require('../jwt')

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
router.post('/signup',async(req,res)=>{
    try{
        const data = req.body;
        const newPerson = new personModel(data);
        const response = await newPerson.save();
        console.log("data saved in database");
          
        // sending data by toke 
        const payload = {
            id : response.id,
            name:response.name,
            username : response.username,
        }

        //add jwt token 
        // const token = genrateToke(response.username) it will only send username
        const token = genrateToke(payload)
        console.log("token is " ,JSON.stringify(payload))
        console.log("token is :" ,token)

        res.status(200).json({response:response,token:token});
    }catch(err){
         console.log("some error"+err);
         res.status(500).json({error:"some error occured"})
    }
  
})

//for login by sending token by clint
router.post('/login',async(req,res)=>{
    try{
        //get data from req body
      const  {username,password} =req.body;
      const user = await personModel.findOne({username:username}) ;

      if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({error:"invalid username or password"});
      }
      //genrate token
      const payload ={
        id : user.id,
        username:user.username
      }
      const token =genrateToke(payload);
      res.json({token})

    }catch(err){
      console.log(err);
      res.status(500).json({error:"internal error"})
    }
} )


//profile
router.get('/profile',jwtMiddlware,async(req,res)=>{
    try{
       const userData = req.user;
       console.log("user data is " ,userData)
       const userID = userData.id
       const find = await personModel.findById(userID);
       res.status(200).json({find});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal error"})
    }
})



//for send data from server to clint
router.get('/' ,jwtMiddlware, async(req,res)=>{
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

//comment added in person routes for testing
module.exports=router;