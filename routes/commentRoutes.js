var express = require("express");
var Router = express.Router();
var user = require("../models/user");
var post = require("../models/post");
var comment=require("../models/comment");
// const auth = require("../middleware/auth");
const today = new Date();
const date = today.toLocaleDateString("en-GB");

var multer = require("multer");



//get comments by  on a post using postid

Router.get("/:postId", async (req, res) => {
	try {
		const postId = req.params.postId;
		const searchedComments = await comment.find({ postId: postId });
		if (!searchedComments || searchedComments.length === 0) {
			return res.status(404).json({ message: "No comments on this post" });
		}
		res.status(200).json(searchedComments);
	} catch (error) {
		console.error("Error fetching comments:", error.message);
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

//add comment
Router.post("/", async (req, res) => {
	const { userId,postId,commentBody } = req.body;

	try {
		const newComment = new comment({
			
			userId,
			postId,
            commentBody,
			date: date,
		});

		await newComment.save();
		res.status(201).json(newComment);
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
