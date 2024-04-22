import { Router } from "express";
import { User } from "../../schemas/user.js";
//
const router = Router();

router.post("/user/login", (req, res) => {
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
					console.log(`isMatch: ${isMatch}`);
					res.status(200).json({ username: req.body.username });
				} else {
					res.status(401).json("Invalid credentials.");
				}
			});
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
});

export default router;
