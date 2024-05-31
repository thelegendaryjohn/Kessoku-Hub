import { Router } from "express";
import multer from "multer";
import { Post } from "../../models/post.js";
import { Topic } from "../../models/topic.js";
//
const router = Router();

// Functions
export const getPost = (id) => {
	return Post.findById(id)
		.populate("author", "-__v -email -password")
		.populate("topicId");
};

// Middleware to prevent restricted or banned users from posting
function checkUser(req, res, next) {
	if (!req.session.user) {
		return res.status(401).json("Unauthorized.");
	} else if (req.session.user.isRestricted || req.session.user.isBanned) {
		return res.status(401).json("Unauthorized.");
	}
	next();
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/"); // Change the path to your desired upload folder
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({ storage });
// Creating a new post
router.post(
	"/thread/post",
	checkUser,
	upload.single("attachment"),
	async (req, res) => {
		console.log(req.body);
		// Make sure the input is valid
		if (
			req.body.title.length < 5 ||
			req.body.title.length > 64 ||
			req.body.content.length < 5 ||
			!req.body.topic
		) {
			return res.status(401).json("Invalid input.");
		}

		// Check whether the topic exists
		let topic = await Topic.findById(req.body.topic);
		if (!topic) {
			return res.status(401).json("Topic not found.");
		}

		// Check whether the user has permission to post in the topic
		if (topic.allowedRole > req.session.user.role) {
			return res.status(401).json("Unauthorized.");
		}

		// Create a new post
		let post = new Post({
			title: req.body.title,
			content: req.body.content,
			author: req.session.user._id,
			topicId: topic._id,
			attachment: req.file ? req.file.path : null,
		});

		try {
			await post.save();
			res.redirect(`/forum/thread/${post._id}`);
		} catch (err) {
			console.log(err);
			res.status(500).json("Error creating post");
		}
	}
);

// Getting a post by ID
router.get("/thread/post/:id", (req, res) => {
	if (!req.params.id) {
		return res.status(401).json("Invalid input.");
	}
	// Validate the input
	if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(401).json("Invalid input.");
	}

	getPost(req.params.id)
		.then((post) => {
			return res.status(200).json(post);
		})
		.catch((err) => {
			console.log(err.Error.messages);
			return res.status(500).json(err);
		});
});

// Deleting a post by ID
router.delete("/thread/post/:id", (req, res) => {
	if (!req.params.id) {
		return res.status(401).json("Invalid input.");
	}
	// Validate the input
	if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(401).json("Invalid input.");
	}

	// Check whether the user is logged in
	if (!req.session.user) {
		return res.status(401).json("Unauthorized.");
	}

	getPost(req.params.id)
		.then((post) => {
			if (
				post.author._id.toString() !==
					req.session.user._id.toString() ||
				req.session.user.role < 2
			) {
				return res.status(401).json("Unauthorized.");
			}
			Post.findByIdAndDelete(req.params.id)
				.then(() => {
					return res.status(200).json("Post deleted.");
				})
				.catch((err) => {
					console.log(err);
					return res.status(500).json(err);
				});
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json(err);
		});
});

// Editing a post by ID
router.put("/thread/post/:id", async (req, res) => {
	if (!req.params.id) {
		return res.status(401).json("Invalid input.");
	}
	// Validate the input
	if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(401).json("Invalid input.");
	}

	// Check whether the user is logged in
	if (!req.session.user) {
		return res.status(401).json("Unauthorized.");
	}

	getPost(req.params.id)
		.then((post) => {
			if (
				post.author._id.toString() !== req.session.user._id.toString()
			) {
				return res.status(401).json("Unauthorized.");
			}
			post.title = req.body.title;
			post.content = req.body.content;
			post.save()
				.then((post) => {
					return res.status(200).json({
						_id: post._id,
						title: post.title,
						content: post.content,
					});
				})
				.catch((err) => {
					console.log(err);
					return res.status(500).json(err);
				});
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json(err);
		});
});

// Pinning a post by ID, only available to admins
router.put("/thread/post/pin/:id", async (req, res) => {
	if (!req.params.id) {
		return res.status(401).json("Invalid input.");
	}
	// Validate the input
	if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(401).json("Invalid input.");
	}

	// Check whether the user is logged in
	if (!req.session.user || req.session.user.role < 2) {
		return res.status(401).json("Unauthorized.");
	}

	getPost(req.params.id)
		.then((post) => {
			post.pinned = !post.pinned;
			post.save()
				.then((post) => {
					return res.status(200).json({
						_id: post._id,
						title: post.title,
						content: post.content,
						pinned: post.pinned,
					});
				})
				.catch((err) => {
					console.log(err);
					return res.status(500).json(err);
				});
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json(err);
		});
});

// Unpinning a post by ID, only available to admins
router.put("/thread/post/unpin/:id", async (req, res) => {
	if (!req.params.id) {
		return res.status(401).json("Invalid input.");
	}
	// Validate the input
	if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(401).json("Invalid input.");
	}

	// Check whether the user is logged in
	if (!req.session.user || req.session.user.role < 2) {
		return res.status(401).json("Unauthorized.");
	}

	getPost(req.params.id)
		.then((post) => {
			post.pinned = false;
			post.save()
				.then((post) => {
					return res.status(200).json({
						_id: post._id,
						title: post.title,
						content: post.content,
						pinned: post.pinned,
					});
				})
				.catch((err) => {
					console.log(err);
					return res.status(500).json(err);
				});
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json(err);
		});
});
export default router;
