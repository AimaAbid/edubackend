var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var questionSchema = new Schema({
	moduleId:String ,
	questionText:String,
    options:{},
    correctAnswer: String
	
    
	
});

var question = mongoose.model("Question", questionSchema);

module.exports = question;
// {
//     "id": "string",
//     "moduleId": "string",
//     "questionText": "string",
//     "options": ["string", "string", "string", "string"],
//     "correctAnswer": "string"
//   }
  