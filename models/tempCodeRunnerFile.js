const mongoose=require('mongoose');

const menuItemSchema = new mongoose.Schema({
      name:{
      type:String,
      required:true
      },
      price:{
        type:Number,
        required:true
      },
      tase:{
        type:String,
        enum:['sweet','sour','spicy'],
        required:true
      },
      is_dring:{
        type:Boolean,
        default:false
      },
      ingredients:{
        type:[String],
        default:[]
      },
      num_sale:{
        type:Number,
        default:0
      },
})

const menuItem = mongoose.model('menuItem',menuItemSchema,'menuItem');
module.exports=menuItem;