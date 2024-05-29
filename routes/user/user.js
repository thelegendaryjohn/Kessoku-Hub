import { Router } from "express";
import { User } from "../../models/user.js";
//
const router = Router();

// Getting a user by ID. This route is only meant for API usage.
router.get("/user/:id", (req, res) => {
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
router.get("/user/:id/posts", (req, res) => {
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
router.get("/user/:id/comments", (req, res) => {
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
router.post("/user/restrict", (req, res) => {
	if (!req.body.id) {
		return res.status(400).send("Missing URL parameter: ID");
	}

	User.findByIdAndUpdate(req.body.id, { isRestricted: true }, (err, user) => {
		if (err) {
			return res.status(500).json(err);
		} else {
			return res.status(200).json(user);
		}
	});
});

// Unrestrict a user by ID.
router.post("/user/unrestrict", (req, res) => {
	if (!req.body.id) {
		return res.status(400).send("Missing URL parameter: ID");
	}

	User.findByIdAndUpdate(
		req.body.id,
		{ isRestricted: false },
		(err, user) => {
			if (err) {
				return res.status(500).json(err);
			} else {
				return res.status(200).json(user);
			}
		}
	);
});

// Ban a user by ID.
router.put("/user/ban/:id", (req, res) => {
	User.findByIdAndUpdate(req.body.id, { isBanned: true }, (err, user) => {
		if (err) {
			return res.status(500).json(err);
		} else {
			return res.status(200).json(user);
		}
	});
});

// Unban a user by ID.
router.put("/user/unban/:id", (req, res) => {
	User.findByIdAndUpdate(req.body.id, { isBanned: false }, (err, user) => {
		if (err) {
			return res.status(500).json(err);
		} else {
			return res.status(200).json(user);
		}
	});
});

export default router;
