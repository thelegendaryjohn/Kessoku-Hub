import mongoose from "mongoose";
import * as colors from "./consoleThemes.js";
import "dotenv/config";

// Warn if .env file is missing
export function startDatabase() {
	if (!process.env.DB_PASSWORD)
		console.error(
			`${colors.db} ${colors.error} DB_PASSWORD not found in .env file! If you're part of the Kessoku team, please ask for the password.`
		);

	mongoose
		.connect(
			`mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.nejuznn.mongodb.net/dev?retryWrites=true&w=majority`
		)
		.then(() => console.log(`${colors.db} Connected to MongoDB!`))
		.catch((err) =>
			console.error(
				`${colors.db} ${colors.error} Could not connect to MongoDB:`,
				err.message
			)
		);
}
