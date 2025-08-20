const mongoose = require("mongoose");
const {model} = require("mongoose");
const {Schema} = require("mongoose");

const TodoSchema = mongoose.Schema( {
     date : Date , 
     todo : String ,
     done : {
        type : Boolean ,
        default : false ,
     },
     PNOO : String ,
     user : 
     {
         type : Schema.Types.ObjectId ,
         ref : 'user'
     }
})

module.exports = mongoose.model("todo" , TodoSchema);