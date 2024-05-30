import { Router } from "express";
import { User } from "../../models/user.js";
import { Validator } from "jsonschema";

const router = Router();
const v = new Validator();
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY; // Ensure to set this in your environment variables

let schema = {
	type: "object",
	properties: {
		username: { type: "string" },
		password: { type: "string" },
		remember: { type: "boolean" },
		token: { type: "string" }, // Add reCAPTCHA token to the schema
	},
	required: ["username", "password", "remember", "token"], // Make reCAPTCHA token required
};

// Apply the user login route
router.post("/account/login", async (req, res, next) => {
	let result = v.validate(req.body, schema);
	if (!result.valid) {
		return res.status(401).json("Invalid input.");
	}

	try {
		// Verify reCAPTCHA
		const recaptchaResponse = await fetch(
			`https://www.google.com/recaptcha/api/siteverify`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					secret: RECAPTCHA_SECRET_KEY,
					response: req.body.token,
				}),
			}
		);
		const recaptchaData = await recaptchaResponse.json();

		if (!recaptchaData.success) {
			return res.status(401).json("Invalid reCAPTCHA.");
		}

		// Disallow the request if reCAPTCHA score is below 0.5
		if (recaptchaData.score < 0.5) {
			return res.status(401).json("Invalid reCAPTCHA score.");
		}

		// Check whether the user info matches the database
		const user = await User.findOne({ username: req.body.username });
		if (!user) {
			return res.status(401).json("Invalid credentials.");
		}

		// Compare the password
		user.comparePassword(req.body.password, (err, isMatch) => {
			if (err) {
				throw err;
			}
			if (isMatch) {
				// Saves the user info into the session
				req.session.regenerate((err) => {
					if (err) return next(err);

					// Save user info into session, remove the password
					req.session.user = user;

					// Set expires if remember is false
					req.session.cookie.maxAge = req.body.remember
						? 24 * 60 * 60 * 1000 // 24 hours
						: null;

					req.session.save(function (err) {
						if (err) return next(err);
						return res
							.status(200)
							.json({ username: req.body.username });
					});
				});
			} else {
				return res.status(401).json("Invalid credentials.");
			}
		});
	} catch (err) {
		return res.status(500).json(err);
	}
});

export default router;
