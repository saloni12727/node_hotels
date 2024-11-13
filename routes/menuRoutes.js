const express = require('express');
const router = express.Router();
const  menuModel = require('../models/menu');


//save menu data 
router.post('/',async(req,res)=>{
    try{
     const menuData = req.body;
     const newData = new menuModel(menuData);
     const response = await newData.save() ;
     console.log("data saved in data base");
     res.status(200).json(response);
    }catch(err){
      console.log("some error ",err);
      res.status(500).json({error:"some error occures"})
    }
 })

 //send data to clint
router.get('/',async(req,res)=>{
    try{
       const data = await menuModel.find();
   console.log("data send");
   res.status(200).json(data);

    }catch(err){
       console.log("some error ",err);
    res.status(500).json({error:"some error occures"})
  
    }
})

//get data according to work
router.get('/:tasteType',async(req,res)=>{
   try{
    const tastedata = req.params.tasteType;
    if(tastedata == 'sour' || tastedata == 'sweet' || tastedata == 'spicy'){
        const findData = await menuModel.find({taste:tastedata})
        console.log("data send");
        res.status(200).json(findData);
    }
    else{
        res.status(404).json({error:"invalid taste"});
    }

   }catch(err){
    console.log("error ",err);
    res.status(500).json({error:"some error"})
   }
})

//update menu data 
router.put('/:id',async(req,res)=>{
    try{
       const getItemById = req.params.id;
       const newUpdatedItem = req.body;

        // Check if `getItemById` is a valid MongoDB ObjectId
       
       const response = await menuModel.findByIdAndUpdate(getItemById,newUpdatedItem,{
              new:true,
              runValidators:true
       });

        if(!response)
        {
            return res.status(404).json({error:"id is invalid"});
        }
         console.log("data updated");
        res.status(200).json(response);
    }catch(err){
        console.log("error ",err);
        res.status(500).json({error:"some error"})
    }
})


//for delete
router.delete('/:id',async(req,res)=>{
    try{
     const menuItemId = req.params.id;
     const deletedMenuItem = await menuModel.findByIdAndDelete(menuItemId);

     if(!deletedMenuItem)
     {
        return res.status(404).json({error:"id is invalid"})
     }
    }catch(err){
        console.log("error ",err);
        res.status(500).json({error:"some error"})
       
    }
})

//comment added for testing
module.exports = router
