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
		title: { type: "string" },
		content: { type: "string" },
		topic: { type: "string" },
	},
	required: ["title", "content"],
};
// Functions
export const getPost = (id) => {
	return Post.findById(id).populate("authorId").populate("topicId");
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
	let topic = await Topic.findOne({ name: req.body.topic });
	if (!topic) {
		return res.status(401).json("Topic not found.");
	}

	// Create a new post
	let post = new Post({
		title: req.body.title,
		content: req.body.content,
		authorId: req.session.user._id,
		topicId: topic._id,
	});

	post.save()
		.then((post) => {
			return res.status(200).json({
				title: post.title,
				content: post.content,
				authorId: post.authorId.toString(),
				topicId: post.topicId.toString(),
			});
		})
		.catch((err) => {
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
			console.log(err);
			return res.status(500).json(err);
		});
});

export default router;
