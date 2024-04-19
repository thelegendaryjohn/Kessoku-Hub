import rateLimit from "express-rate-limit";
import { Validator } from "jsonschema";
import { app } from "../../lib/app.js";
import { User } from "../../schemas/user.js";

// Set up the validator
let v = new Validator();
let schema = {
	type: "object",
	properties: {
		username: { type: "string", pattern: "^[A-Za-z][A-Za-z0-9_]{0,31}$" },
		// Between 1 and 32 characters long and must not start with a number or special characters (only letters at the beginning), and the rest of the characters can include letters, numbers, or special characters.
		password: { type: "string", pattern: "^[A-Za-z][A-Za-z0-9_]{5,31}$" },
		// Between 6 and 32 characters long and must not start with a number or special characters (only letters at the beginning), and the rest of the characters can include letters, numbers, or special characters.
	},
	required: ["username", "password"],
};

// Define rate limit rule
const registerLimit = rateLimit({
	windowMs: 5 * 1000, // 10 seconds
	max: 1, // limit each IP to 1 requests per windowMs
	message:
		"Too many register attempts from this IP, please try again after 15 minutes.",
});

// Apply the user register route
app.post("/user/register", registerLimit, async (req, res) => {
	// Sanitize the input
	let result = v.validate(
		{
			username: req.body.username,
			password: req.body.password,
		},
		schema
	);
	if (result.valid) {
		let creds = result.instance;
		// Check if the username is already taken
		let user = await User.findOne({ username: creds.username });
		if (user) {
			res.status(409).send("Username already taken.");
		} else {
			// Create the user
			let newUser = new User(creds);
			await newUser.save();
			res.status(201).send("User created.");
		}
	}
});
