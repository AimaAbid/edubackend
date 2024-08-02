var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userprogressSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
	points: Number,
	badges: {
		type: [String],
		default: [] // Ensure badges is an array by default
	  },
	  finalExamCorrectAnswers:Number
});

var userprogress = mongoose.model("Userprogress", userprogressSchema);

module.exports = userprogress;
