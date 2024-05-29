import { Router } from "express";
import { Validator } from "jsonschema";
import { Post } from "../../models/post.js";
import { Topic } from "../../models/topic.js";
//
const router = Router();
const v = new Validator();
let schema = {
	type: "object",
	properties: {
		title: { type: "string", minLength: 5, maxLength: 64 },
		content: { type: "string" },
		topic: { type: "string" },
	},
	required: ["title", "content", "topic"],
};
// Functions
export const getPost = (id) => {
	return Post.findById(id).populate("author").populate("topicId");
};

// Creating a new post
router.post("/thread/post", async (req, res) => {
	let result = v.validate(req.body, schema);
	if (!result.valid) {
		return res.status(401).json("Invalid input.");
	}

	// Check whether the user is logged in
	if (!req.session.user) {
		return res.status(401).json("Unauthorized.");
	}

	// Check whether the topic exists
	let topic = await Topic.findById(req.body.topic);
	if (!topic) {
		return res.status(401).json("Topic not found.");
	}

	// Check whether the user has permission to post in the topic
	if (topic.allowedRole > req.session.user.role) {
		return res.status(401).json("Unauthorized.");
	}

	// Create a new post
	let post = new Post({
		title: req.body.title,
		content: req.body.content,
		author: req.session.user._id,
		topicId: topic._id,
	});

	post.save()
		.then((post) => {
			return res.status(200).json({
				_id: post._id,
				title: post.title,
				content: post.content,
				author: post.author.toString(),
				topicId: post.topicId.toString(),
			});
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json(err);
		});
});

// Getting a post by ID
router.get("/thread/post/:id", (req, res) => {
	if (!req.params.id) {
		return res.status(401).json("Invalid input.");
	}
	// Validate the input
	if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(401).json("Invalid input.");
	}

	getPost(req.params.id)
		.then((post) => {
			return res.status(200).json(post);
		})
		.catch((err) => {
			console.log(err.Error.messages);
			return res.status(500).json(err);
		});
});

// Deleting a post by ID
router.delete("/thread/post/:id", (req, res) => {
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

	getPost(req.params.id)
		.then((post) => {
			if (
				post.author.toString() !== req.session.user._id.toString() ||
				req.session.user.role < 2
			) {
				return res.status(401).json("Unauthorized.");
			}
			post.remove()
				.then(() => {
					return res.status(200).json("Post deleted.");
				})
				.catch((err) => {
					console.log(err);
					return res.status(500).json(err);
				});
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json(err);
		});
});

// Editing a post by ID
router.put("/thread/post/:id", async (req, res) => {
	if (!req.params.id) {
		return res.status(401).json("Invalid input.");
	}
	// Validate the input
	if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(401).json("Invalid input.");
	}

	let result = v.validate(req.body, schema);
	if (!result.valid) {
		return res.status(401).json("Invalid input.");
	}

	// Check whether the user is logged in
	if (!req.session.user) {
		return res.status(401).json("Unauthorized.");
	}

	getPost(req.params.id)
		.then((post) => {
			if (post.author.toString() !== req.session.user._id.toString()) {
				return res.status(401).json("Unauthorized.");
			}
			post.title = req.body.title;
			post.content = req.body.content;
			post.save()
				.then((post) => {
					return res.status(200).json({
						_id: post._id,
						title: post.title,
						content: post.content,
					});
				})
				.catch((err) => {
					console.log(err);
					return res.status(500).json(err);
				});
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json(err);
		});
});

// Pinning a post by ID, only available to admins
router.put("/thread/post/pin/:id", async (req, res) => {
	if (!req.params.id) {
		return res.status(401).json("Invalid input.");
	}
	// Validate the input
	if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(401).json("Invalid input.");
	}

	// Check whether the user is logged in
	if (!req.session.user || req.session.user.role < 2) {
		return res.status(401).json("Unauthorized.");
	}

	getPost(req.params.id)
		.then((post) => {
			post.pinned = !post.pinned;
			post.save()
				.then((post) => {
					return res.status(200).json({
						_id: post._id,
						title: post.title,
						content: post.content,
						pinned: post.pinned,
					});
				})
				.catch((err) => {
					console.log(err);
					return res.status(500).json(err);
				});
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json(err);
		});
});
export default router;
