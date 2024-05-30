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

router.get("/account/menu", (req, res) => {
	if (!req.session.user) {
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

router.get("/account/logout", (req, res) => {
	// See if the user is logged in and the request is valid
	if (!req.session.user) {
		return res.status(401).json("Unauthorized.");
	}
	// Logs the user out
	req.session.destroy((err) => {
		console.log("Logging out");
		if (err) {
			console.error(err);
			return res.status(500).json("Error logging out.");
		}
		render(req, res, "account/accountSuccess", {
			message: `Logging you out`,
			isLogout: true,
		});
	});
});

export default router;
