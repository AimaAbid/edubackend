var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },//post kaunsi hai
    postId: { type: Schema.Types.ObjectId, ref: 'post', required: true },//kis user nai comment kiya hai
    commentBody:String,
    date:String
    
});

var user = mongoose.model("Comment", commentSchema);

module.exports = user;
