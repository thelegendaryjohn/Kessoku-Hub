import { User } from "../../schemas/user.js";
import * as colors from "../../lib/consoleThemes.js";
import assert from "assert";

// Create a new user to test
let user;
// This will run before running the test
beforeEach(function (done) {
	// Creating a new Instance of User Model
	user = new User({
		username: "testuser",
		password: "testpassword",
	});
	user.save().then(() => {
		//console.log(`${colors.test} User created`);
		done();
	});
});

describe(`${colors.test} Reading a user's details from MongoDB`, () => {
	it(`${colors.test} should be able to read a user`, (done) => {
		User.findOne({ username: "testuser" })
			.then((user) => {
				assert(
					user.username === "testuser",
					"Username is not testuser"
				);
				assert(
					user.password !== "testpassword",
					"Password is in plaintext"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});
