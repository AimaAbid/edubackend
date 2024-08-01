var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var questionSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
	questionId: { type: Schema.Types.ObjectId, ref: "question", required: true },
	selectedAnswer: String,
});

var answer = mongoose.model("Answer", answerSchema);

module.exports = answer;

// {
//     "userId": "string",
//     "questionId": "string",
//     "selectedAnswer": "string"
//   }
