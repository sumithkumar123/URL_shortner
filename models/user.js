const mongoose=require('mongoose');

const user=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role: {
        type:String,
        required:true,
        defaut:"NORMAL"
    },
    password:{
        type:String,
        required:true
    },

},{timestamps:true});

const users=mongoose.model("user",user)

module.exports=users;