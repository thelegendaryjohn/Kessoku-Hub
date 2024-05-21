import { Router } from "express";
//
const router = Router();

export function logout(req, callback) {
	req.session.destroy((err) => {
		if (err) {
			return callback(err);
		}
		return callback(null);
	});
}

router.post("/account/logout", (req, res) => {
	// See if the user is logged in and the request is valid
	if (!req.session.user) {
		return res.status(401).json("Unauthorized.");
	}

	logout(req, (err) => {
		if (err) {
			return res.status(500).json("Error logging out.");
		}
		return res.status(200).json("Logged out.");
	});
});

export default router;
