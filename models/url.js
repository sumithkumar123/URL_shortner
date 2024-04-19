const mongoose=require('mongoose');

const url=new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    originalURL:{
        type:String,
        required:true
    },
    visits: [{
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },

},{timestamps:true});

const urls=mongoose.model("url",url)

module.exports=urls;