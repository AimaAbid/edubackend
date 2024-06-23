var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	email: String,
	imgPath: Array,
	resumePath: String,
    age: Number,
    qualification: String,
    password: String,
    
});

var user = mongoose.model("User", userSchema);

module.exports = user;
