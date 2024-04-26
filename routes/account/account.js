import { Router } from "express";
import { render } from "../../lib/render.js";
import logout from "../user/logout.js";
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

router.get("/account/logout", (req, res, next) => {
	// Logs the user out
	logout(req, res, next);
	render(req, res, "account/accountSuccess", {
		message: `Logging you out`,
	});
});

export default router;
