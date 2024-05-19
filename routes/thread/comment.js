import { Router } from "express";
import { Comment } from "../../models/comment.js";
import { Validator } from "jsonschema";
//
const router = Router();
//
const v = new Validator();
let schema = {
	type: "object",
	properties: {
		content: { type: "string" },
		postId: { type: "string" },
	},
	required: ["content", "postId"],
};

// Posting a comment
router.post("/thread/comment", (req, res) => {
	// Validate the input
	let result = v.validate(req.body, schema);
	if (!result.valid) {
		return res.status(401).json("Invalid input.");
	}

	// Check whether the user is logged in
	if (!req.session.user) {
		return res.status(401).json("Unauthorized.");
	}

	// Create a new comment
	let comment = new Comment({
		content: req.body.content,
		authorId: req.session.user._id,
		postId: req.body.postId,
	});

	comment
		.save()
		.then((comment) => {
			return res.status(200).json(comment);
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
});

// Getting comments by post ID
router.get("/thread/comment/post/:id", (req, res) => {
	Comment.find({ postId: req.params.id })
		.populate("authorId")
		.then((comments) => {
			return res.status(200).json(comments);
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
});

// Getting a comment by ID
router.get("/thread/comment/:id", (req, res) => {
	Comment.findById(req.params.id)
		.populate("authorId")
		.then((comment) => {
			return res.status(200).json(comment);
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
});
