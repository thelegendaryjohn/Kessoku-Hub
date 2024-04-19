import { User } from "../../schemas/user.js";
import * as colors from "../../lib/consoleThemes.js";
import assert from "assert";

// Describe the tests
describe(`${colors.test} Creating a document in MongoDB`, function () {
	// Create a document
	it(`${colors.test} should create a new user`, function (done) {
		// Create a new user
		const user = new User({
			username: "testuser",
			password: "testpassword",
		});
		user.save()
			.then(() => {
				// Check if the user is saved
				assert(!user.isNew);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});
