import { User } from "../../schemas/user.js";
import * as colors from "../../lib/consoleThemes.js";
import assert from "assert";

describe(`Deleting a document from MongoDB`, () => {
	// Create a new user to test
	let user;
	// This will run before running the test
	before(function (done) {
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

	it(`should delete a user`, (done) => {
		User.findOneAndDelete({ username: "testuser" })
			.then(() => User.findOne({ username: "testuser" }))
			.then((user) => {
				assert(user === null);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});
