const env = process.env.NODE_ENV;
import { Router } from "express";
import { render } from "../../lib/render.js";
import logout from "./logout.js";
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

router.get("/account/menu", (req, res) => {
	if (!req.session.user && env != "test" && env != "dev") {
		return res.redirect("/account");
	}

	render(req, res, "account/accountMenu");
});

router.get("/account/profile", (req, res) => {
	render(req, res, "account/accountEdit");
});

router.get("/account/settings", (req, res) => {
	if (!req.session.user) {
		return res.redirect("/account");
	}

	return render(req, res, "account/accountSettings");
});

router.get("/account/logout", (req, res, next) => {
	// Logs the user out
	logout(req, res, next);
	render(req, res, "account/accountSuccess", {
		message: `Logging you out`,
	});
});

export default router;
