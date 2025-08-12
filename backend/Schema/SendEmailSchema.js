const mongoose = require("mongoose");
const {model } = require("mongoose")
const {Schema } = require("mongoose")
const user = require("./userSchema");

 const EmailSchema = new Schema(
    {
        To: String,
        Subject: String,
        Text: String,
        URL: String,
        Date : Date,
        sent :{
          type : Boolean , 
          default : false ,   
        },
        user : {
             type : Schema.Types.ObjectId,
             ref : 'user'
        }
    }
)

 module.exports = mongoose.model("Email" , EmailSchema);