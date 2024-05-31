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
// Functions
export const getComment = (singleComment, id) => {
	let comment;
	if (singleComment) {
		comment = Comment.findOne({ _id: id, isArchived: { $ne: true } });
	} else {
		comment = Comment.findOne({ postId: id, isArchived: { $ne: true } });
	}
	return comment
		.populate("author", "-__v -email -password")
		.sort({ createdAt: -1 });
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
		author: req.session.user._id,
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
	if (!req.params.id) {
		return res.status(401).json("Invalid input.");
	}

	// Validate the input
	if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(401).json("Invalid input.");
	}

	const comments = getComment(false, req.params.id);
	comments
		.then((comments) => {
			return res.status(200).json(comments);
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
});

// Getting a comment by ID
router.get("/thread/comment/:id", (req, res) => {
	// Validate the input
	if (!req.params.id) {
		return res.status(401).json("Invalid input.");
	}

	// Validate the input
	if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(401).json("Invalid input.");
	}

	const comment = getComment(true, req.params.id);
	comment
		.then((comment) => {
			return res.status(200).json(comment);
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
});

// Deleting a comment by ID
router.delete("/thread/comment/:id", (req, res) => {
	// Validate the input
	if (!req.params.id) {
		return res.status(401).json("Invalid input.");
	}

	// Validate the input
	if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(401).json("Invalid input.");
	}

	// Check whether the user is logged in
	if (!req.session.user) {
		return res.status(401).json("Unauthorized.");
	}

	Comment.findById(req.params.id, (err, comment) => {
		if (err) {
			return res.status(500).json(err);
		} else {
			if (
				comment.author.toString() !== req.session.user._id ||
				req.session.user.role < 2
			) {
				return res.status(401).json("Unauthorized.");
			}

			comment.isArchived = true;
			comment
				.save()
				.then(() => {
					return res.status(200).json("Comment deleted.");
				})
				.catch((err) => {
					return res.status(500).json(err);
				});
		}
	});
});

// Updating a comment by ID
router.put("/thread/comment/:id", (req, res) => {
	// Validate the input
	if (!req.params.id) {
		return res.status(401).json("Invalid input.");
	}

	// Validate the input
	if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(401).json("Invalid input.");
	}

	// Check whether the user is logged in
	if (!req.session.user) {
		return res.status(401).json("Unauthorized.");
	}

	Comment.findById(req.params.id, (err, comment) => {
		if (err) {
			return res.status(500).json(err);
		} else {
			if (comment.author.toString() !== req.session.user._id) {
				return res.status(401).json("Unauthorized.");
			}

			comment.content = req.body.content;
			comment
				.save()
				.then((comment) => {
					return res.status(200).json(comment);
				})
				.catch((err) => {
					return res.status(500).json(err);
				});
		}
	});
});

export default router;
