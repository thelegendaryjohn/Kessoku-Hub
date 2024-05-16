import { Router } from "express";
import { User } from "../../models/user.js";
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

// Apply the user login route
router.post("/user/login", (req, res, next) => {
	let result = v.validate(req.body, schema);
	if (!result.valid) {
		return res.status(401).json("Invalid input.");
	}
	// Check whether the user info matches the database
	User.findOne({ username: req.body.username })
		.then((user) => {
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
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
});

export default router;
