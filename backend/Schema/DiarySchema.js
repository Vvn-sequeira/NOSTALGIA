const mongoose = require("mongoose")
const {model , Schema} = require("mongoose")
const user = require("./userSchema");

const DiarySchema = new Schema(
    {
          date : Date ,
          heading : String,
          text : String ,
          user : {
             type : Schema.Types.ObjectId,
             ref : user 
          }
    }
)

module.exports = mongoose.model("Diary" , DiarySchema);