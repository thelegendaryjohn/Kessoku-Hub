import { Router } from "express";
import { render } from "../lib/render.js";
import { characters } from "../public/js/landing/characters.js";
import { Topic } from "../models/topic.js";
import { Post } from "../models/post.js";
//
const router = Router();

router.get("/", async (req, res) => {
	// Show announcement and discussion topics on the landing page
	const topics = await Topic.find({
		$or: [{ name: "Announcements" }, { name: "General Discussion" }],
	});
	let posts = {};
	for (let topic of topics) {
		posts[topic._id] = await Post.find({ topicId: topic._id })
			.sort({ createdAt: -1 })
			.limit(2)
			.populate("author", "-__v -email -password");
	}

	render(req, res, "landingPage", {
		charNames: characters.map((char) => char.id),
		topics: topics,
		posts: posts,
	});
});

export default router;
