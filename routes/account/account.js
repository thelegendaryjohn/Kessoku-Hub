const env = process.env.NODE_ENV;
import { Router } from "express";
import { render } from "../../lib/render.js";
import { User } from "../../models/user.js";
import upload from "../../lib/multer.js";
//
const router = Router();

// Middleware function to prevent archived users from accessing the account
function checkArchived(req, res, next) {
	if (req.session.user?.isArchived) {
		return render(req, res, "account/accountSuccess", {
			message: `Your account is archived.`,
		});
	}
	next();
}

router.get("/account", (req, res) => {
	render(req, res, "account/accountSignIn");
});

router.get("/account/success", (req, res) => {
	render(req, res, "account/accountSuccess", {
		message: `Logging you in as <b>${req.query.username}</b>`,
	});
});

router.get("/account/menu", checkArchived, (req, res) => {
	if (!req.session.user && env != "test" && env != "dev") {
		return res.redirect("/account");
	}

	render(req, res, "account/accountMenu");
});

router.get("/account/profile", checkArchived, (req, res) => {
	render(req, res, "account/accountEdit");
});

router.post("/account/profile", upload.single("avatar"), (req, res) => {
	if (!req.session.user) {
		return res.status(401).json("Unauthorized.");
	}

	User.findByIdAndUpdate(req.session.user._id, {
		avatar: req.file ? req.file.path : "",
		birthday: req.body.birthday ? new Date(req.body.birthday) : null,
		bio: req.body.bio,
	})
		.then(() => {
			res.status(200).redirect("/account/profile");
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({
				error: "An error occurred while updating the profile.",
			});
		});
});

router.get("/account/settings", checkArchived, (req, res) => {
	if (!req.session.user) {
		return res.redirect("/account");
	}

	return render(req, res, "account/accountSettings");
});

router.get("/account/logout", (req, res) => {
	// See if the user is logged in and the request is valid
	if (!req.session.user) {
		return res.status(401).json("Unauthorized.");
	}
	// Logs the user out
	req.session.destroy((err) => {
		console.log("Logging out");
		if (err) {
			console.error(err);
			return res.status(500).json("Error logging out.");
		}
		render(req, res, "account/accountSuccess", {
			message: `Logging you out`,
			redirect: "/",
		});
	});
});

export default router;
