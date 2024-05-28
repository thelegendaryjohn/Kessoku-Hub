import { Router } from "express";
import { User } from "../../models/user.model";
//
const router = Router();

// Getting a user by ID. This route is only meant for API usage.
router.get("/:id", (req, res) => {
	if (!req.params.id) {
		return res.status(400).send("Missing URL parameter: ID");
	}

	User.findById(req.params.id, (err, user) => {
		if (err) {
			return res.status(500).json(err);
		} else {
			let userObj = user.toObject();
			// Remove sensitive data
			delete userObj.password;
			return res.status(200).json(userObj);
		}
	});
});

export default router;
