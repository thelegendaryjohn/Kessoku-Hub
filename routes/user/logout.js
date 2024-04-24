import { Router } from "express";
//
const router = Router();

router.get("/user/logout", (req, res, next) => {
	req.session.user = null;
	req.session.save((err) => {
		if (err) next(err);

		req.session.regenerate((err) => {
			if (err) next(err);
			res.status(200).json("Successfully logged out.");
		});
	});
});

export default router;
