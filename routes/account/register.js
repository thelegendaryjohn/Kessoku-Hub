const NODE_ENV = process.env.NODE_ENV;
//
import { Router } from "express";
import { Validator } from "jsonschema";
import { User } from "../../models/user.js";
import rateLimit from "express-rate-limit";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY; // Ensure to set this in your environment variables

const router = Router();

// Set up the validator
const v = new Validator();
const schema = {
	type: "object",
	properties: {
		username: { type: "string", pattern: "^[A-Za-z][A-Za-z\\d]{2,31}$" }, // Adjusted regex pattern
		password: { type: "string", pattern: "^[A-Za-z][A-Za-z\\d]{5,31}$" }, // Adjusted regex pattern
		token: { type: "string" }, // Add reCAPTCHA token to the schema
	},
	required: ["username", "password", "token"], // Make reCAPTCHA token required
};

// Define rate limit rule
const registerLimit = rateLimit({
	windowMs: 5 * 1000, // 10 seconds
	max: 1, // limit each IP to 1 request per windowMs
	message:
		"Too many register attempts from this IP, please try again after 10 seconds.",
});

function useRateLimit(req, res, next) {
	if (NODE_ENV === "prod") {
		registerLimit(req, res, next);
	} else {
		next();
	}
}

// Apply the user register route
router.post("/account/register", useRateLimit, async (req, res) => {
	// Sanitize the input
	let result = v.validate(
		{
			username: req.body.username,
			password: req.body.password,
			token: req.body.token,
		},
		schema
	);

	if (!result.valid) {
		// Loop through all the errors
		return res.status(400).json(
			result.errors.map((error) => ({
				path: error.path,
				message: error.message,
			}))
		);
	}

	try {
		if (NODE_ENV === "prod") {
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
		}

		const creds = result.instance;

		// Check if the username is already taken
		const user = await User.findOne({ username: creds.username });
		if (user) {
			return res.status(409).json("Username already taken.");
		}

		// Create the user
		const newUser = new User(creds);
		await newUser.save();
		return res.status(201).json({ username: creds.username });
	} catch (err) {
		return res.status(500).json(err);
	}
});

export default router;
