var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");
var app = express();
app.use(bodyParser.json());
app.use(cors());


var path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(8000, () => {
	console.log("listening on 8000");
});

var userRoutes = require("./routes/userRoutes");

app.use("/users", userRoutes);
var postRoutes = require("./routes/postRoutes");
app.use("/posts", postRoutes);

var commentRoutes = require("./routes/commentRoutes");
app.use("/comments", commentRoutes);

var quizRoutes = require("./routes/quizRoutes");

app.use("/quiz", quizRoutes);

mongoose
	.connect("mongodb://127.0.0.1:27017/educollabhub")
	.then(() => {
		console.log("connected to Mongo");
	})
	.catch(() => {
		console.log("something went wrong");
	});
