import { User } from "../../schemas/user.js";
import * as colors from "../../lib/consoleThemes.js";
import assert from "assert";

describe(`${colors.test} Deleting a document from MongoDB`, () => {
	it(`${colors.test} Deletes a user`, (done) => {
		User.findOneAndRemove({ username: "testuser" })
			.then(() => User.findOne({ username: "testuser" }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});
});
