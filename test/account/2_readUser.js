import { User } from "../../models/user.js";
import assert from "assert";

describe(`Reading a user's details from MongoDB`, () => {
	// Create a new user to test
	let user;
	// This will run before running the test
	beforeEach(function (done) {
		User.collection.drop(() => {
			// Creating a new Instance of User Model
			user = new User({
				username: "testuser",
				password: "testpassword",
			});
			user.save().then(() => {
				done();
			});
		});
	});

	it(`should be able to read a user`, (done) => {
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
