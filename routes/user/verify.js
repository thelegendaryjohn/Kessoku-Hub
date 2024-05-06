import "dotenv/config";
import { Router } from "express";
import { User } from "../../models/user.js";
//
const router = Router();

router.post("/user/verify", async (req, res) => {
	const email = req.body.email;
	if (!email) return res.status(400).send("Email is required.");
	// Set session to verifying
	if (!req.session.verifying) {
		req.session.verifying = true;
	} else {
		return res.status(400).send("Already verifying.");
	}
	// Also prevents non logged in users from verifying
	if (!req.session.user) {
		req.session.verifying = false;
		return res.status(401).send("Unauthorized.");
	}
	// Prevents alerady verified users from verifying
	if (req.session.user.role !== User.roles.unverified) {
		req.session.verifying = false;
		return res.status(409).send("User is already verified.");
	}
	// Find the user
	User.verifyEmail(function (data, err) {
		if (err) return res.status(500).json(err);

		return res.status(200).json(data);
	});
});

export default router;
