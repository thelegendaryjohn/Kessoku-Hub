import "dotenv/config";
import { Router } from "express";
import nodemailer from "nodemailer";
//
const router = Router();
//
let transporter = nodemailer.createTransport({
	host: "smtp-relay.brevo.com",
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});
// verify connection configuration
transporter.verify(function (error, success) {
	if (error) {
		console.log(error);
	} else {
		console.log("Server is ready to take our messages: " + success);
	}
});

router.get("/user/verify", (req, res) => {
	// send mail with defined transport object
	transporter.sendMail(
		{
			from: "support@bocchi.band", // sender address
			to: "azgamedeveloper@gmail.com", // testing
			subject: "Verify your Kessoku Hub account", // Subject line
			text: "Hello world?", // plain text body
		},
		(error, info) => {
			if (error) {
				console.log(error);
				res.status(500).json("Error sending email");
			} else {
				console.log("Email sent: " + info.response);
				res.status(200).json("Email sent");
			}
		}
	);
});

export default router;
