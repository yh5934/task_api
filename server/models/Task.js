let mongoose = require("mongoose");

let TaskSchema = new mongoose.Schema({
    title:{type:String, require:true, minlength:2, maxlength:64},
    description:{type:String, default:" ", maxlength:1024},
    completed:{type:Boolean, default:false},

},{timestamps:true});
// timestamps=automatically prints created at and updated at

mongoose.model("Task",TaskSchema);
// Task: creat a collection in database(mongoDB)