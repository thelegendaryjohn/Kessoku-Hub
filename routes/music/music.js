import { Router } from "express";
import { render } from "../../lib/render.js";
//
const router = Router();

let songs = [];

router.get("/music", (req, res) => {
	render(req, res, "music/musicPage", {
		// songs: songs,
	});
});

export default router;
