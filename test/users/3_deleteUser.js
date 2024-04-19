import { User } from "../../schemas/user.js";
import * as colors from "../../lib/consoleThemes.js";
import assert from "assert";

// This will run before running the test
let user;
before(function (done) {
	// Creating a new Instance of User Model
	user = new User({
		username: "testuser",
		password: "testpassword",
	});
	user.save().then(() => {
		console.log(`${colors.test} User created`);
		done();
	});
});

describe(`${colors.test} Deleting a document from MongoDB`, () => {
	it(`${colors.test} should delete a user`, (done) => {
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
