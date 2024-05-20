import { Router } from "express";
import { render } from "../lib/render.js";
import { characters } from "../public/js/landing/characters.js";
import { thread } from "../public/js/forum/forum.js";
//
const router = Router();

router.get("/", (req, res) => {
	render(req, res, "landingPage", {
		charNames: characters.map((char) => char.id),
		thread: thread,
	});
});

export default router;
