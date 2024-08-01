var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var courseownerSchema = new Schema({
	name: String,
	email: String,
	imgPath: String,
    qualification: String
   
    
});

var courseowner = mongoose.model("Courseowner", courseownerSchema);

module.exports = courseowner;
