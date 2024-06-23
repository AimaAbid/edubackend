var express = require("express");
var Router = express.Router();
var user = require("../models/user");
var post = require("../models/post");

var multer = require("multer");

//get posts
Router.get("/", (req, res) => {
	post
		.find()
		.then((posts) => res.send(posts))
		.catch(() => res.send("some error"));
});

//get user by id
Router.get("/:id", (req, res) => {
	user
		.findById(req.params.id)
		.then((user) => res.send(user))
		.catch(() => res.send("some error"));
});
//edit user by id

Router.put("/:id", (req, res) => {
	user
		.findByIdAndUpdate(req.params.id, req.body)
		.then((user) => res.status(200).send("User Updated Successfully!"))
		.catch(() => res.send("some error"));
});
//add post
Router.post("/", async (req, res) => {
	const { title, description, mainBody, userId } = req.body;

	try {
		

		const newPost = new post({
			title,
			mainBody,
			description,
			userId
		});

		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(500).json({ message: error.message});
	}
});
//delete user
Router.delete("/:id", (req, res) => {
	user
		.findByIdAndDelete(req.params.id)
		.then(() => res.send("User deleted Successfully!"))
		.catch(() => res.send("some error"));
});

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

var multer = multer({ storage: storage });
//upload
Router.post("/up", multer.array("filename"), (req, res) => {
	console.log(req.files.length);
	var Path = [];
	for (var i = 0; i < req.files.length; i++) {
		Path.push(req.files[i].filename);
	}
	// res.send("hello");

	res.send(Path);
	console.log(Path);
});

//signup

Router.post("/sign-up", (req, res) => {
	newUser = new user({
		name: req.body.name,
		email: req.body.email,
		// imgPath: req.body.imgPath,
		// resumePath: req.body.resumePath,
		age: req.body.age,
		qualification: req.body.qualification,
		password: req.body.password,
	});
	newUser
		.save()
		.then(() => {
			console.log("saved");
			res.status(200).send(newUser);
		})
		.catch((err) => {
			console.log(err);
		});
});

//login
// const user = await usersCollection.findOne({ email: email, password: password });

Router.post("/login", async (req, res) => {
	const { name, password } = req.body;

	try {
		const newuser = await user.findOne({ name: name, password: password });

		if (newuser) {
			res.status(200).json({ userId: user._id, message: "Login successful!" });
		} else {
			res
				.status(400)
				.json({ message: "Login failed! Invalid email or password." });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = Router;
