import "dotenv/config";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { render } from "../../lib/render.js";
import { User, roles } from "../../models/user.js";
//
const router = Router();

router.post("/account/verify", async (req, res) => {
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
	if (req.session.user.role !== roles.unverified) {
		req.session.verifying = false;
		return res.status(409).send("User is already verified.");
	}
	// Find the user
	User.findById(req.session.user._id).then((user) => {
		if (!user) return res.status(404).send("User not found.");
		// Send the email
		user.verifyEmail(email, (data, err) => {
			if (err) return res.status(500).json(err);
			// Set session to not verifying
			req.session.email = email;
			req.session.verifying = false;
			return res.status(200).json(data);
		});
	});
});

router.get("/account/verify/:token", async (req, res) => {
	// Check if the token is valid
	jwt.verify(
		req.params.token,
		process.env.JWT_SECRET,
		async (err, decoded) => {
			if (err) return res.status(400).json(err);
			// Find the user
			const user = await User.findById(decoded.id);
			if (!user) return res.status(404).send("User not found.");
			if (user.role !== roles.unverified)
				return res.status(409).send("User is already verified.");
			// Verify the user
			user.role = roles.user;
			user.email = req.session.email;
			await user.save();

			render(req, res, "account/accountSuccess", {
				message: `Your <b>${user.username}</b> account email has been verified!`,
			});
		}
	);
});

export default router;
