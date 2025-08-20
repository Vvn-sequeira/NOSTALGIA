const mongoose = require("mongoose")
const {Schema , model } = require("mongoose");

let userSchema = new Schema(
    {
          username : String,
          email : String, 
          password : String,
          PNOO : String , 
          user : {
          type :   Schema.Types.ObjectId ,
          ref : 'user'
          }
    }
)

module.exports = mongoose.model("user" ,  userSchema);