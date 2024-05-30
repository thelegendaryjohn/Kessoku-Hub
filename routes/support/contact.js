import { Router } from "express";
import { render } from "../../lib/render.js";
//
const router = Router();

router.get("/contact-us", (req, res) => {
	render(req, res, "support/contactPage");
});

export default router;
