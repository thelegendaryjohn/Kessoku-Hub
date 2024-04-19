import mongoose from "mongoose";
import * as colors from "../../lib/consoleThemes.js";
import "dotenv/config";

// Connect to the database
// Warn if .env file is missing
if (!process.env.DB_PASSWORD)
	console.error(
		`${colors.db} ${colors.error} DB_PASSWORD not found in .env file! If you're part of the Kessoku team, please ask for the password.`
	);
// Connect to the test database
mongoose
	.connect(
		`mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.nejuznn.mongodb.net/test?retryWrites=true&w=majority`
	)
	.then(() =>
		console.log(`${colors.test} ${colors.db} Connected to testing MongoDB!`)
	)
	.catch((err) =>
		console.error(
			`${colors.db} ${colors.error} Could not connect to MongoDB:`,
			err.message
		)
	);

// Run this hook before each tests
beforeEach(function (done) {
	// Drop the users collection
	mongoose.connection.collections.users.drop(() => {
		// console.log(`${colors.test} ${colors.db} Dropped the users collection`);
		done();
	});
});
