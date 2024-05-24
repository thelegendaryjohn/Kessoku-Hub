import { Router } from "express";
import { render } from "../../lib/render.js";
import { Topic } from "../../models/topic.js";
import { Post } from "../../models/post.js";
import { roles } from "../../models/user.js";
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

router.get("/forum/welcome", (req, res) => {
	render(req, res, "forum/forumWelcome");
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
	// Validate post id
	if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(401).json("Invalid input.");
	}

	let post = getPost(req.params.id);
	let comments = getComment(false, req.params.id);

	[post, comments] = await Promise.all([post, comments]);

	render(req, res, "forum/postPage", {
		topic: post.topicId,
		post: post,
		comments: comments,
		isGuest: !req.session.user,
		isVerified: req.session.user
			? req.session.user.role !== roles.unverified
			: false,
	});
});

router.get("/forum/post/create", async (req, res) => {
	// Redirect user to welcome page if not logged in
	if (!req.session.user) {
		return res.redirect("/forum/welcome");
	}
	// Get all topics
	const topics = await Topic.find({});
	render(req, res, "forum/postCreatePage", {
		topics: topics,
		isVerified: req.session.user.role !== roles.unverified,
	});
});

router.get("/forum/inbox", (req, res) => {
	if (!req.session.user) {
		return res.redirect("/forum/welcome");
	}
	render(req, res, "forum/notifPage", {});
});

export default router;
