import { User } from "../../models/user.js";
import assert from "assert";

// Describe the tests
describe(`Creating a document in MongoDB`, function () {
	// Drop the users collection before each test
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

	// Creating two docments in a row
	it(`should create two users`, function (done) {
		// Create a new user
		const user1 = new User({
			username: "testuser1",
			password: "testpassword1",
		});
		user1
			.save()
			.then(() => {
				// Check if the user is saved
				assert(!user1.isNew, "User is not saved");
			})
			.catch((err) => {
				done(err);
			});
		// Create another user
		const user2 = new User({
			username: "testuser2",
			password: "testpassword2",
		});
		user2
			.save()
			.then(() => {
				// Check if the user is saved
				assert(!user2.isNew, "User is not saved");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});
