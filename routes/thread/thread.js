import { Router } from "express";
import { getPost } from "./post.js";
import { getComment } from "./comment.js";
//
const router = Router();

// Getting a thread (a post with comments)
router.get("/thread/:id", async (req, res) => {
	// Fetch posts and comments from their routes
	const post = getPost(req.params.id);
	const comments = getComment(false, req.params.id);
	//
	try {
		const results = await Promise.all([post, comments]);
		return res.status(200).json({ post: results[0], comments: results[1] });
	} catch (err) {
		return res.status(500).json(err);
	}
});
