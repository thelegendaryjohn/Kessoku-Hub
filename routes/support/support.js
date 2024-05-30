import { Router } from "express";
import { render } from "../../lib/render.js";
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
	if (!req.body.subject || !req.body.email || !req.body.message) {
		return res.status(401).json("All fields are required.");
	}

	// Save the message to the database
	let result = await SupportForm.create({
		email: req.body.email,
		subject: req.body.subject,
		message: req.body.message,
	});
	if (!result) {
		return res.status(500).json("Failed to save message.");
	} else {
		return res.status(200).json("Message saved.");
	}
});

router.get("/support/success", (req, res) => {
	render(req, res, "account/accountSuccess", {
		message: `Your message has been sent!`,
	});
});

export default router;
