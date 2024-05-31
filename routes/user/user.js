import { Router } from "express";
import { User } from "../../models/user.js";
import { app } from "../../lib/app.js";
import { render } from "../../lib/render.js";
//
const router = Router();

// Middleware to update the user's info from the database in the session
app.use(async (req, res, next) => {
	if (req.session.user) {
		req.session.user = await User.findById(req.session.user._id);
	}
	next();
});

// Getting a user by ID. This route is only meant for API usage.
router.get("/api/user/:id", (req, res) => {
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

// Getting a user's recent posts, with page and limit query parameters.
router.get("/api/user/:id/posts", (req, res) => {
	if (!req.params.id) {
		return res.status(400).send("Missing URL parameter: ID");
	}

	let page = req.query.page ? parseInt(req.query.page) : 1;
	let limit = req.query.limit ? parseInt(req.query.limit) : 10;

	User.findById(req.params.id, (err, user) => {
		if (err) {
			return res.status(500).json(err);
		} else {
			user.getPosts(page, limit, (err, posts) => {
				if (err) {
					return res.status(500).json(err);
				} else {
					return res.status(200).json(posts);
				}
			});
		}
	});
});

// Getting a user's recent comments, with page and limit query parameters.
router.get("/api/user/:id/comments", (req, res) => {
	if (!req.params.id) {
		return res.status(400).send("Missing URL parameter: ID");
	}

	let page = req.query.page ? parseInt(req.query.page) : 1;
	let limit = req.query.limit ? parseInt(req.query.limit) : 10;

	User.findById(req.params.id, (err, user) => {
		if (err) {
			return res.status(500).json(err);
		} else {
			user.getComments(page, limit, (err, comments) => {
				if (err) {
					return res.status(500).json(err);
				} else {
					return res.status(200).json(comments);
				}
			});
		}
	});
});

// Restrict a user by ID.
router.put("/api/user/restrict/:id", async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.params.id,
			{ isRestricted: true },
			{ new: true } // This option returns the updated document
		);
		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).json(err);
	}
});

// Unrestrict a user by ID.
router.put("/api/user/unrestrict/:id", async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.params.id,
			{ isRestricted: false },
			{ new: true } // This option returns the updated document
		);
		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).json(err);
	}
});

// Ban a user by ID.
router.put("/api/user/ban/:id", async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.params.id,
			{ isBanned: true },
			{ new: true } // This option returns the updated document
		);
		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).json(err);
	}
});

// Unban a user by ID.
router.put("/api/user/unban/:id", async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.params.id,
			{ isBanned: false },
			{ new: true } // This option returns the updated document
		);
		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).json(err);
	}
});

// Archive a user by ID.
router.post("/api/user/archive/:id", async (req, res) => {
	if (!req.params.id) {
		return res.status(400).send("Missing URL parameter: ID");
	}
	if (!req.session.user) {
		return res.status(401).send("Unauthorized.");
	}
	if (req.session.user._id != req.params.id) {
		return res.status(401).send("Unauthorized.");
	}
	try {
		await User.findByIdAndUpdate(
			req.params.id,
			{ isArchived: true },
			{ new: true } // This option returns the updated document
		);
		req.session.destroy((err) => {
			if (err) {
				console.error(err);
				return res.status(500).json("Error logging out.");
			}

			return render(req, res, "account/accountSuccess", {
				message: `Your account has been archived. Logging you out.`,
				redirect: "/",
			});
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json(err);
	}
});

// Set a new password for a user by ID.
router.put("/api/user/password/:id", async (req, res) => {
	if (!req.params.id) {
		return res.status(400).send("Missing URL parameter: ID");
	}
	if (!req.session.user) {
		return res.status(401).send("Unauthorized.");
	}
	if (req.session.user._id != req.params.id) {
		return res.status(401).send("Unauthorized.");
	}
	if (!req.body.oldPassword) {
		return res.status(400).send("Missing password.");
	}
	try {
		const user = await User.findById(req.params.id);
		user.comparePassword(req.body.oldPassword, async (err, isMatch) => {
			if (err) {
				return res.status(500).json("Old password is incorrect.");
			}
			if (isMatch) {
				if (req.body.oldPassword != req.body.newPassword) {
					user.password = req.body.newPassword;
					await user.save();
					return res.status(200).json("Password updated.");
				} else {
					return res.status(400).json("Password cannot be the same.");
				}
			} else {
				return res.status(500).json("Old password is incorrect.");
			}
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json(err);
	}
});

export default router;
