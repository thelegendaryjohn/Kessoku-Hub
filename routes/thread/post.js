import { Router } from "express";
import { Validator } from "jsonschema";
import { Post } from "../../models/post.js";
//
const router = Router();
const v = new Validator();
let schema = {
	type: "object",
	properties: {
		title: { type: "string" },
		content: { type: "string" },
	},
	required: ["title", "content"],
};
// Functions
export const getPost = (id) => {
	return Post.findById(id).populate("authorId");
};

// Creating a new post
router.post("/thread/post", (req, res) => {
	let result = v.validate(req.body, schema);
	if (!result.valid) {
		return res.status(401).json("Invalid input.");
	}

	// Check whether the user is logged in
	if (!req.session.user) {
		return res.status(401).json("Unauthorized.");
	}

	// Create a new post
	let post = new Post({
		title: req.body.title,
		content: req.body.content,
		authorId: req.session.user._id,
	});

	post.save()
		.then((post) => {
			return res.status(200).json(post);
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
	getPost(req.params.id)
		.then((post) => {
			return res.status(200).json(post);
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
});

export default router;
