import { Router } from "express";
import { render } from "../../lib/render.js";
//
const router = Router();

router.get("/videos", (req, res) => {
	render(req, res, "video/videoPage");
});

export default router;
