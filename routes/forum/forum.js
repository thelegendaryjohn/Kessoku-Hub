import { Router } from "express";
import { render } from "../../lib/render.js";
import { thread } from "../../public/js/forum/forum.js";
//
const router = Router();

router.get("/forum", (req, res) => {
	render(req, res, "forum/forumPage", {
		thread: thread,
	});
});

router.get("/forum/thread", (req, res) => {
	render(req, res, "forum/threadPage", {
		thread: thread,
	});
});

export default router;
