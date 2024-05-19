import { Router } from "express";
//
const router = Router();

export function logout(req, res, next) {
	req.session.user = null;
	req.session.save((err) => {
		if (err) next(err);

		req.session.regenerate((err) => {
			res.status(200).json("Successfully logged out.");

			if (err) next(err);
		});
	});
}

router.get("/account/logout", (req, res, next) => {
	logout(req, res, next);
});

export default router;
