var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
	title: String,
	subject: String,
	bodySection: String,
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true }, // Reference to User
    imgPath:Array,
	date:String
	
});

var post = mongoose.model("Post", postSchema);

module.exports = post;
