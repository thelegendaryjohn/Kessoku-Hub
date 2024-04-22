import { Router } from "express";
import { User } from "../../schemas/user.js";
import { Validator } from "jsonschema";
//
const router = Router();
const v = new Validator();
let schema = {
	type: "object",
	properties: {
		username: { type: "string" },
		password: { type: "string" },
		remember: { type: "boolean" },
	},
	required: ["username", "password", "remember"],
};

router.post("/user/login", (req, res) => {
	let result = v.validate(req.body, schema);
	if (!result.valid) {
		return res.status(401).json("Invalid input.");
	}
	// Check whether the user info matches the database
	User.findOne({ username: req.body.username })
		.then((user) => {
			if (!user) {
				console.log(`user: ${req.body.username}`);
				return res.status(401).json("Invalid credentials.");
			}
			// Compare the password
			user.comparePassword(req.body.password, (err, isMatch) => {
				if (err) {
					throw err;
				}
				if (isMatch) {
					// Saves the user info into the session
					req.body.remember
						? (req.session.user = user)
						: (req.session.user = null);
					return res
						.status(200)
						.json({ username: req.body.username });
				} else {
					return res.status(401).json("Invalid credentials.");
				}
			});
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
});

export default router;
