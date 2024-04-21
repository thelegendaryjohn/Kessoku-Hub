import { Router } from "express";
import { render } from "../../lib/render.js";
//
const router = Router();

router.get("/account", (req, res) => {
	render(req, res, "account/accountPage");
});

router.get("/account/success", (req, res) => {
	render(req, res, "account/accountSuccess");
});

export default router;
