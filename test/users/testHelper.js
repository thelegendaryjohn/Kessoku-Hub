import mongoose from "../../lib/db.js";
import * as colors from "../../lib/consoleThemes.js";

// Flushes the database before running tests
mongoose.connection
	.once("open", () => {
		mongoose.connection.db.dropDatabase();
		console.log(`${colors.test} ${colors.db} Database flushed!`);
	})
	.on("error", (error) => {
		console.warn(`${colors.test} ${colors.db} ${colors.warn} `, error);
	});

// Run this hook before each tests
beforeEach((done) => {
	mongoose.connection.collections.users.drop(() => {
		done();
	});
});
