import { User } from "../../schemas/user.js";
import * as colors from "../../lib/consoleThemes.js";
import assert from "assert";

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
