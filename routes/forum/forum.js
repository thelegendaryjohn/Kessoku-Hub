import { Router } from "express";
import { render } from "../../lib/render.js";
import { Topic } from "../../models/topic.js";
import { Post } from "../../models/post.js";
//
import { getPost } from "../thread/post.js";
import { getComment } from "../thread/comment.js";
//
const router = Router();

router.get("/forum", async (req, res) => {
	const topics = await Topic.find({});
	let posts = {};
	for (let topic of topics) {
		posts[topic._id] = await Post.find({ topicId: topic._id })
			.sort({ createdAt: -1 })
			.limit(3)
			.populate("author");
	}
	render(req, res, "forum/forumPage", {
		topics: topics,
		posts: posts,
	});
});

router.get("/forum/topic/:id", (req, res) => {
	const topic = Topic.findById(req.params.id);
	if (!topic) {
		return res.status(404).json("Topic not found.");
	}
	//
	const posts = Post.find({ topicId: req.params.id }).populate("author");
	render(req, res, "forum/topicPage", {
		topic: topic,
		posts: posts,
	});
});

router.get("/forum/thread/:id", (req, res) => {
	const post = getPost(req.params.id);
	const comments = getComment(false, req.params.id);

	render(req, res, "forum/postPage", {
		post: post,
		comments: comments,
	});
});

router.get("/forum/thread/create", (req, res) => {
	render(req, res, "forum/postCreatePage", {});
});

router.get("/forum/inbox", (req, res) => {
	render(req, res, "forum/notifPage", {});
});

export default router;
