import { Router } from "express";
import { render } from "../../lib/render.js";
import { User, roles } from "../../models/user.js";
import { Post } from "../../models/post.js";
import { Comment } from "../../models/comment.js";
//
const router = Router();

router.get("/user/:username", async (req, res) => {
	const user = await User.findOne({ username: req.params.username });
	if (!user) {
		return res.status(404).json("User not found.");
	} else {
		const postCount = await Post.countDocuments({ author: user._id });
		const commentCount = await Comment.countDocuments({ author: user._id });
		render(req, res, "account/profilePage", {
			user: user,
			postCount: postCount,
			commentCount: commentCount,
			isProfile: true,
			currUser: req.session.user,
			isCurrUserAdmin: req.session.user?.role === roles.admin,
			isNotVerified:
				user.role === roles.unverified && user.role !== roles.admin,
			isVerified: user.role === roles.user && user.role !== roles.admin,
			isAdmin: user.role === roles.admin,
		});
	}
});

export default router;
