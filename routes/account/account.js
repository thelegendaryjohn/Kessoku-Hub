import { Router } from "express";
import { render } from "../../lib/render.js";
//
const router = Router();

router.get("/account", (req, res) => {
	render(req, res, "account/accountSignIn");
});

router.get("/account/success", (req, res) => {
	render(req, res, "account/accountSuccess", {
		message: `Logging you in as <b>${req.query.username}</b>`,
	});
});

export default router;
