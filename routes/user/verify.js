import "dotenv/config";
import jwt from "jsonwebtoken";
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

router.get("/user/verify/:token", async (req, res) => {
	// Check if the token is valid
	jwt.verify(
		req.params.token,
		process.env.JWT_SECRET,
		async (err, decoded) => {
			if (err) return res.status(400).json(err);
			// Find the user
			const user = User.findById(decoded.id);
			if (!user) return res.status(404).send("User not found.");
			// Verify the user
			user.role = User.roles.user;
			await user.save();

			return res.status(200).send("User verified.");
		}
	);
});

export default router;
