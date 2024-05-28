import { Router } from "express";
import { render } from "../lib/render.js";
import { SupportForm } from "../../models/supportForm.js";
//
const router = Router();

router.get("/support", async (req, res) => {
	// Show the contact us page
	render(req, res, "support", {});
});

// POST request to submit a contact form
router.post("/support", async (req, res) => {
	// Process the contact form
	if (!req.body.name || !req.body.email || !req.body.message) {
		return res.status(401).json("All fields are required.");
	}

	// Save the message to the database
	await SupportForm.create({
		email: req.body.email,
		name: req.body.name,
		message: req.body.message,
	});

	res.redirect("/support");
});

export default router;
