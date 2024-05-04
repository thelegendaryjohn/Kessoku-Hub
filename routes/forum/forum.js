import { Router } from "express";
import { render } from "../../lib/render.js";
//
const router = Router();

router.get("/forum", (req, res) => {
	render(req, res, "forum/forumPage");
});

router.get("/forum/topic", (req, res) => {
	render(req, res, "forum/topicPage");
});

export default router;
