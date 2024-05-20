import { Router } from "express";
import { render } from "../../lib/render.js";
import { Topic } from "../../models/topic.js";
import { Post } from "../../models/post.js";
//
const router = Router();

router.get("/forum", async (req, res) => {
	const topics = await Topic.find({});
	let posts = {};
	for (let topic of topics) {
		posts[topic._id] = await Post.find({ topicId: topic._id })
			.sort({ createdAt: -1 })
			.limit(3)
			.populate("authorId");
	}
	render(req, res, "forum/forumPage", {
		topics: topics,
		posts: posts,
	});
});

router.get("/forum/topic", (req, res) => {
	render(req, res, "forum/topicPage", {});
});

router.get("/forum/post", (req, res) => {
	render(req, res, "forum/postPage", {});
});

router.get("/forum/post/create", (req, res) => {
	render(req, res, "forum/postCreatePage", {});
});

router.get("/forum/inbox", (req, res) => {
	render(req, res, "forum/notifPage", {});
});

export default router;
