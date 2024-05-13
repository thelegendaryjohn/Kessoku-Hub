import { Router } from "express";
import { render } from "../../lib/render.js";
//
const router = Router();

router.get("/forum", (req, res) => {
	render(req, res, "forum/forumPage");
});

router.get("/forum/thread", (req, res) => {
	render(req, res, "forum/threadPage");
});

export default router;
