import { Router } from "express";
import { render } from "../../lib/render.js";
//
const router = Router();

router.get("/forum", (req, res) => {
	render(req, res, "forum/forumPage", {});
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
