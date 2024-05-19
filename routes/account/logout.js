import { Router } from "express";
//
const router = Router();

export function logout(req, res, next) {
	req.session.user = null;
	req.session.save((err) => {
		if (err) next(err);

		req.session.regenerate((err) => {
			if (err) next(err);
		});
	});
}

router.post("/account/logout", (req, res, next) => {
	// See if the user is logged in and the request is valid
	if (!req.session.user) {
		return res.status(401).json("Unauthorized.");
	}

	logout(req, res, next);
	return res.status(200).json("Logged out.");
});

export default router;
