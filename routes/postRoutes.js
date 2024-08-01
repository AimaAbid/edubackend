var express = require("express");
var Router = express.Router();
var user = require("../models/user");
var post = require("../models/post");
// const auth = require("../middleware/auth");
const today = new Date();
const date = today.toLocaleDateString("en-GB");

var multer = require("multer");

//get posts
Router.get("/", (req, res) => {
	post
		.find()
		.then((posts) => res.send(posts))
		.catch(() => res.send("some error"));
});

//get post by userid

Router.get("/:userId", async (req, res) => {
	try {
		const userId = req.params.userId;
		const searchedPosts = await post.find({ userId: userId });
		if (!searchedPosts || searchedPosts.length === 0) {
			return res.status(404).json({ message: "No posts found for this user" });
		}
		res.status(200).json(searchedPosts);
	} catch (error) {
		console.error("Error fetching posts:", error.message);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
});
//get post by posts own id

Router.get("/post/:id", async (req, res) => {
	try {
		const searchedPost = await post.findById(req.params.id);
		if (!searchedPost) {
			return res.status(404).json({ message: "Post not found" });
		}
		res.status(200).send(searchedPost);
	} catch (error) {
		console.error("Error fetching post:", error.message);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
});
//edit post by id

Router.put("/:id", async (req, res) => {
	try {
		const updatedPost = await post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!updatedPost) {
			return res.status(404).json({ message: "Post not found" });
		}
		res
			.status(200)
			.json({ message: "Post Updated Successfully!", post: updatedPost });
	} catch (error) {
		console.error("Error updating post:", error.message);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
});

//add post
Router.post("/", async (req, res) => {
	const { title, subject, userId, imgPath, bodySection } = req.body;

	try {
		const newPost = new post({
			title,
			subject,
			bodySection,
			userId,
			imgPath,
			date: date,
		});

		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
//delete post
Router.delete("/:id", async (req, res) => {
	try {
		const deletedPost = await post.findByIdAndDelete(req.params.id);
		if (!deletedPost) {
			return res.status(404).json({ message: "Post not found" });
		}
		res.status(200).json({ message: "Post deleted successfully!" });
	} catch (error) {
		console.error("Error deleting post:", error.message);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
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

module.exports = Router;
