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

router.get("/forum/topic/:name", async (req, res) => {
	if (!req.params.name) {
		return res.status(401).json("Invalid input.");
	}

	const topic = await Topic.findOne({ name: req.params.name });
	if (!topic) {
		return res.status(404).json("Topic not found.");
	}
	//
	const posts = await Post.find({ topicId: topic._id }).populate("author");

	render(req, res, "forum/topicPage", {
		topic: topic,
		posts: posts,
	});
});

router.get("/forum/thread/:id", async (req, res) => {
	let post = getPost(req.params.id);
	let comments = getComment(false, req.params.id);

	[post, comments] = await Promise.all([post, comments]);

	render(req, res, "forum/postPage", {
		topic: post.topicId,
		post: post,
		comments: comments,
	});
});

router.get("/forum/post/create", async (req, res) => {
	// Get all topics
	const topics = await Topic.find({});
	render(req, res, "forum/createPostPage", { topics: topics });
});

router.get("/forum/inbox", (req, res) => {
	render(req, res, "forum/notifPage", {});
});

export default router;
