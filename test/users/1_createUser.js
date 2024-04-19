import { User } from "../../schemas/user.js";
import assert from "assert";

// Describe the tests
describe(`Creating a document in MongoDB`, function () {
	// Run this hook before each tests
	beforeEach(function (done) {
		// Drop the users collection
		User.collection.drop(() => {
			done();
		});
	});

	// Create a document
	it(`should create a new user`, function (done) {
		// Create a new user
		const user = new User({
			username: "testuser",
			password: "testpassword",
		});
		user.save()
			.then(() => {
				// Check if the user is saved
				assert(!user.isNew, "User is not saved");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});
