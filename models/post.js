var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
	title: String,
	description: String,
	mainBody: String,
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true }, // Reference to User
    imgPath:Array
	
});

var post = mongoose.model("Post", postSchema);

module.exports = post;
