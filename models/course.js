var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    ownerId: { type: Schema.Types.ObjectId, ref: 'courseowner', required: true },//course kis ka hai
  
    date:String
    
});

var user = mongoose.model("Comment", commentSchema);

module.exports = user;
