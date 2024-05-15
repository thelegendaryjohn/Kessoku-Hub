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

router.get("/account/settings", (req, res) => {
	render(req, res, "account/accountMenu");
});

router.get("/account/profile", (req, res) => {
	render(req, res, "account/accountEdit");
});

router.get("/account/security/settings", (req, res) => {
	render(req, res, "account/accountSettings");
})

router.get("/account/logout", (req, res, next) => {
	// Logs the user out
	logout(req, res, next);
	render(req, res, "account/accountSuccess", {
		message: `Logging you out`,
	});
});

export default router;
