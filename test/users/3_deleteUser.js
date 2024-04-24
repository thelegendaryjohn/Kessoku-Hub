import { User } from "../../schemas/user.js";
import assert from "assert";

describe(`Deleting a document from MongoDB`, () => {
	// This will run before running the test
	beforeEach(function (done) {
		User.collection.drop(() => {
			// Creating a new Instance of User Model
			let user = new User({
				username: "testuser",
				password: "testpassword",
			});
			user.save().then(() => {
				done();
			});
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
